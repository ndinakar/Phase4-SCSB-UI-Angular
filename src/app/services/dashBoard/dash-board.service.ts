import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { appHeaders } from '@config/headers';
import { urls } from '@config/urls';
import 'rxjs/add/observable/throw';
import { CookieService } from 'ngx-cookie-service';
var moment = require('moment-timezone');
enum CONSTANTS {
  TIMEZONE = 'America/New_York',
  TIME_DIFF = '04:00',
  TIME_EDT = 'EDT',
  TIME_EST = 'EST',
  SPLIT_BY = '-',
  ERROR = 'error-page',
  HOME = 'home',
  USER_AUTHENTICATED = 'user_authenticated',
  FALSE = 'FALSE',
  FROZEN_INSTITUTIONS = '/getFrozenInstitutions',
  SEARCH = 'search',
  CHECK_PERMISSION = '/checkPermission',
  LOGOUT = '/logout',
  EMAIL = '/getEmail',
  VERSION_NUMBER = '/getVersionNumberService'
}
@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  constructor(private router: Router, private httpClient: HttpClient,
    private spinner: NgxSpinnerService, private cookieService: CookieService) { }
  res: Object;
  isAuthenticated = false;
  PREFIX = urls.DASHBOARD;
  API_PATH : string =CONSTANTS.SEARCH;

  checkPermission(prefix: string): Observable<boolean> {
    return this.httpClient.get<boolean>(prefix + CONSTANTS.CHECK_PERMISSION,
      appHeaders.httpOptions());
  }
  getVersionNumber(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + CONSTANTS.VERSION_NUMBER,
      {
        headers: appHeaders.getHeaders()
      });
  }
  getEmail(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + CONSTANTS.EMAIL,
      {
        headers: appHeaders.getHeaders()
      });
  }
  logout(): void {
    this.httpClient.get<any>(CONSTANTS.LOGOUT, appHeaders.httpOptions());
  }
  errorNavigation() {
    this.spinner.hide();
    this.router.navigate([CONSTANTS.ERROR]);
  }
  validateUser(response) {
    if (response.headers.get(CONSTANTS.USER_AUTHENTICATED) == CONSTANTS.FALSE) {
      this.spinner.hide();
      this.router.navigate([CONSTANTS.HOME]);
    }
  }
  refreshHeaders() {
    return this.API_PATH;
  }
  setApiPath(path){
    this.API_PATH = path;
  }
  setTimeZone(date) {
    if (date) {
      var zone = CONSTANTS.TIMEZONE;
      var d = moment.tz(date, zone).format();
      var splitted = d.split(CONSTANTS.SPLIT_BY);
      if (splitted[3] == CONSTANTS.TIME_DIFF) {
        return CONSTANTS.TIME_EDT;
      } else {
        return CONSTANTS.TIME_EST;
      }
    }
  }

  getFrozenInstitutionMessages(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.PREFIX + CONSTANTS.FROZEN_INSTITUTIONS, { headers: appHeaders.getHeaders() });
  }

}
