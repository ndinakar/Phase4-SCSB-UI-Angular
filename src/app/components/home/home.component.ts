import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  Institutions: any = [];
  institutionErrorMessageDiv = false;
  institution: string = undefined;

  constructor(private formBuilder: FormBuilder, private router: Router, private cookieService: CookieService, private loginService: LoginService, private http: HttpClient) { }
  ngAfterViewInit() {
    // @ts-ignore
    twttr.widgets.load();
  }

  ngOnInit(): void {
    this.institution = undefined;
    this.loginService.getInstitutions().subscribe(
      (res) => {
        this.Institutions = Object.keys(res).map(function (data) {
          return [data, res[data]];
        });
        this.cookieService.delete('userName');
        this.cookieService.delete('loggedInInstitution');
        this.cookieService.delete('isAuthenticated');
        this.cookieService.delete('CSRF-TOKEN');
        this.cookieService.delete('JSESSIONID');

      });
  }
  onSubmit() {
    if (this.institution == '' || this.institution == null || this.institution == undefined) {
      this.institutionErrorMessageDiv = true;
    } else {
      this.institutionErrorMessageDiv = false;
      window.location.href = this.baseUrl + "/login-scsb?institution=" + this.institution;
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
