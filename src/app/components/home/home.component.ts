import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { urls } from 'src/config/urls';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  baseUrl = urls.baseUrl;
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
  postData = {
    "userId": null,
    "username": null,
    "password": null,
    "rememberMe": null,
    "wrongCredentials": null,
    "passwordMatcher": null,
    "institution": null,
    "errorMessage": null,
    "permissions": null
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private http:HttpClient) { }
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
    // if (this.registerForm.invalid) {
    //   return;
    // }
    var formVal = this.registerForm.value;
    window.location.href = this.baseUrl+"/login-scsb?institution="+formVal.institution;
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
