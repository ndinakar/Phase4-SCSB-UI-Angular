import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '@service/login/login.service';
import { urls } from '@config/urls';
import { environment } from 'src/environments/environment';
import { DashBoardService } from '@service/dashBoard/dash-board.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  constructor(private loginService: LoginService, private cookieService: CookieService, private dashBoardService: DashBoardService) { }
  reloadStatus: boolean;
  institution: string = 'default';
  url: string = '';
  casPrefix = urls.CAS_PREFIX;
  redirectForm: FormGroup;
  serviceUrl: string;
  submitted = false;
  Institutions: any = [];
  institutionErrorMessageDiv = false;
  validate: boolean;
  ngAfterViewInit() {
    // @ts-ignore
    twttr.widgets.load();
  }

  ngOnInit(): void {
    this.url = '';
    this.cookieService.deleteAll();
    localStorage.clear();
    this.institution = 'default';
    this.loginService.getInstitutions().subscribe(
      (res) => {
        this.Institutions = res;
      },
      (error) => {
        this.dashBoardService.errorNavigation();
      });
  }
  changeInst() {
    if (this.institution == 'default') {
      this.institutionErrorMessageDiv = true;
      this.validate = false;
    } else {
      this.institutionErrorMessageDiv = false;
      this.url = environment.homeUrl + this.casPrefix + this.institution;
      this.validate = true;
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
  },
  {
    "for": "Harvard users, consult the SCSB information page",
    "url": 'https://wiki.harvard.edu/confluence/pages/viewpage.action?pageId=273094310',
    "name": 'SCSB information page'
  }


  ];

}
