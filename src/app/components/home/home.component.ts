import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NGXLogger } from 'ngx-logger';
import { LoginService } from 'src/app/services/login/login.service';
import { urls } from 'src/config/urls';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  reloadStatus: boolean;
  institution: string = 'default';
  url: string = '';
  baseUrl = urls.baseUrl;
  casPrefix = urls.casPrefix;
  redirectForm: FormGroup;
  serviceUrl: string;
  submitted = false;
  Institutions: any = [];
  institutionErrorMessageDiv = false;
  validate = false;
  constructor(private router: Router, private logger: NGXLogger, private formBuilder: FormBuilder, private cookieService: CookieService, private loginService: LoginService) {

  }
  ngAfterViewInit() {
    // @ts-ignore
    twttr.widgets.load();
  }

  ngOnInit(): void {
    this.cookieService.deleteAll();
    sessionStorage.clear();
    this.redirectForm = this.formBuilder.group({
      institution: ''
    });
    this.reloadStatus = localStorage.reload;
    this.reloadComponent(this.reloadStatus);
    this.institution = 'default';
    this.cookieService.deleteAll();
    this.loginService.getInstitutions().subscribe(
      (res) => {
        this.Institutions = res;
      });
  }
  changeInst() {
    if (this.institution == 'default') {
      this.institutionErrorMessageDiv = true;
      this.validate = false;
    } else {
      this.institutionErrorMessageDiv = false;
      this.url = this.baseUrl + this.casPrefix + this.institution;
      this.validate = true;
    }
  }
  reloadComponent(reloadStatus) {
    if (reloadStatus == 'true') {
      localStorage.setItem('reload', 'false');
      window.location.reload(true);
    }
  }
  returnZero() {
    return 0
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
