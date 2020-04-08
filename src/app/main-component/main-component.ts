import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-hero-form',
  templateUrl: './main-component.html',
  styleUrls: ['./main-component.scss']
})
export class HeroFormComponent implements OnInit {
  hero: Hero = {
    jurusan: '',
  _id: '',
  kuliah: '',
  dosen: '',
  semester: '',
  angkatan:'',
  };
  id = null;
  error = false;
  update = true;

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 999,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // jika ada parameter id di URL
      if (params.get('id')) {
        this.id = params.get('id');

        this.ds.getHero(this.id).subscribe(
          response => {
            this.hero = response as Hero;
          },
          err => {
            console.log(err);
            this.error = true;
          }
        );
      } else {
        this.update = false;
      }
    });
  }

  postHero() {
    this.ds.postHero(this.hero).subscribe(response => {
      // tampilkan notifikasi
      this.openSnackBar("Hero Added", null)
      this.router.navigate(['/main']);
    });
  }

  deleteHero() {
    this.ds.deleteHero(this.hero).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Hero Deleted", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateHero() {
    this.ds.updateHero(this.hero).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Hero Updated", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
