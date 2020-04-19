import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder , FormGroup} from '@angular/forms';
@Component({
  selector: 'app-hero-form',
  templateUrl: './main-component.html',
  styleUrls: ['./main-component.scss']
})
export class HeroFormComponent implements OnInit {
  myForm: FormGroup;
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
    private router: Router,
    private fb: FormBuilder,
  ) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 999,
    });
  }

  ngOnInit(): void {
     this.myForm = this.fb.group({
      jurusan: '',
      _id: '',
      kuliah: '',
      dosen: '',
      semester: '',
      angkatan:'',
     })
    
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
      this.myForm.valueChanges.subscribe(console.log)
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
