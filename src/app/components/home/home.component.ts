import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  registerForm: FormGroup;
  serviceUrl: string;
  submitted = false;
  Institution: string[];
  // Institution = [
  //   { id: 'PUL', name: "Princeton" },
  //   { id: 'CUL', name: "Columbia" },
  //   { id: 'NYPL', name: "New York Public Library" },
  //   { id: 'HTC', name: "HTC" }
  // ];

  constructor(private formBuilder: FormBuilder, private router: Router,private loginService:LoginService) { }

  ngAfterViewInit() {
    // @ts-ignore
    twttr.widgets.load();
  }

  ngOnInit(): void {
    this.loginService.getInstitutions().subscribe(
      (res) => {
        this.Institution = res;
       });
       this.registerForm = this.formBuilder.group({
        institution: ['', Validators.required]
      });
  }
  get f() { return this.registerForm.controls; }
  handleError(error: Response) {
      return error.text;
    }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    var formVal = this.registerForm.value;
    // this.loginService.getserviceUrl(formVal.institution).subscribe(
    //   (res) => {
    //     this.serviceUrl = res;
    //     if(!this.serviceUrl.includes('not found'))
    //     window.location.href = this.serviceUrl;
    //    },
    //    (error) => {
    //      console.log(error);
    //    });
    if (formVal.institution === 'HTC') {
      this.router.navigate(['/search']);
    }
  }

  getinTouch: any[] = [{
    "for": "Princeton users, Role administration, please contact",
    "url": 'mailto:Recapproblems@princeton.edu',
    "name": 'Recapproblems@princeton.edu'
  },

  {
    "for": "Princeton users, Technical support, please contact",
    "url": 'mailto:mzelesky@princeton.edu',
    "name": 'mzelesky@princeton.edu'

  },
  {
    "for": "Columbia users, contact",
    "url": 'mailto:recap.admin@library.columbia.edu',
    "name": 'recap.admin@library.columbia.edu'
  },
  {
    "for": "NYPL users, contact",
    "url": 'mailto:ReCAPinterface@nypl.org',
    "name": 'ReCAPinterface@nypl.org'
  }

  ];

}
