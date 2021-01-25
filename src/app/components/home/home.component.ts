import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NGXLogger } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login/login.service';
import { urls } from 'src/config/urls';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  baseUrl = urls.baseUrl;
  homeUrl = urls.homeUrl;
  registerForm: FormGroup;
  serviceUrl: string;
  submitted = false;
  Institutions: any = [];
  institutionErrorMessageDiv = false;
  institution: string = undefined;

  constructor(private logger: NGXLogger, private cookieService: CookieService, private loginService: LoginService) { }
  ngAfterViewInit() {
    // @ts-ignore
    twttr.widgets.load();
  }

  ngOnInit(): void {
    this.institution = undefined;
    //this.cookieService.deleteAll();
    //localStorage.clear();
    this.logger.info('TESTING');
    this.loginService.getInstitutions().subscribe(
      (res) => {
        this.Institutions = Object.keys(res).map(function (data) {
          return [data, res[data]];
        });
      });
  }
  navigate(institution): void {
    if (this.institution == '' || this.institution == null || this.institution == undefined) {
      this.institutionErrorMessageDiv = true;
    } else {
      this.institutionErrorMessageDiv = false;
      this.loginService.routeToAuth(institution);
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
