import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { appHeaders } from '@config/headers';
import { urls } from '@config/urls';
import 'rxjs/add/observable/throw';
var moment = require('moment-timezone');
enum CONSTANTS {
  TIMEZONE = 'America/New_York',
  TIME_DIFF = '04:00',
  TIME_EDT = 'EDT',
  TIME_EST = 'EST',
  SPLIT_BY = '-',
  ERROR = 'error',
  HOME = 'home'
}
@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  constructor(private router: Router, private httpClient: HttpClient,
    private spinner: NgxSpinnerService) { }
  res: Object;
  isAuthenticated = false;
  PREFIX = urls.DASHBOARD;
  checkPermission(prefix: string): Observable<boolean> {
    return this.httpClient.get<boolean>(prefix + "/checkPermission",
      appHeaders.httpOptions());
  }
  getVersionNumber(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + "/getVersionNumberService",
      {
        headers: appHeaders.getHeaders()
      });
  }
  checkPermission_Monitoring(prefix: string): Observable<boolean> {
    return this.httpClient.get<boolean>(prefix + "/monitoring",
      appHeaders.httpOptions());
  }
  checkPermission_Loggig(prefix: string): Observable<boolean> {
    return this.httpClient.get<boolean>(prefix + "/logging",
      appHeaders.httpOptions());
  }
  getEmail(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + "/getEmail",
      {
        headers: appHeaders.getHeaders()
      });
  }
  logout(): void {
    this.httpClient.get<any>("/logout", appHeaders.httpOptions());
  }
  validate_monitoring(prefix: string) {
    this.checkPermission_Monitoring('/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          this.router.navigate([CONSTANTS.HOME]);
        }
      },
      (error) => {
        this.router.navigate([CONSTANTS.HOME]);
      }
    );
  }
  validate_logging(prefix: string) {
    this.checkPermission_Loggig('/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          this.router.navigate([CONSTANTS.HOME]);
        }
      },
      (error) => {
        this.router.navigate([CONSTANTS.HOME]);
      }
    );
  }
  validate(prefix) {
    this.checkPermission('/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          this.router.navigate([CONSTANTS.HOME]);
        }
      },
      (error) => {
        this.router.navigate([CONSTANTS.HOME]);
      }
    );
  }
  errorNavigation() {
    this.spinner.hide();
    this.router.navigate([CONSTANTS.ERROR]);
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
}
