import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
var moment = require('moment-timezone');

enum CONSTANTS {
  TIMEZONE = 'America/New_York',
  TIME_DIFF = '04:00',
  TIME_EDT = 'EDT',
  TIME_EST = 'EST',
  SPLIT_BY = '-'
}

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  res: Object;
  isAuthenticated = false;
  constructor(private router: Router, private httpClient: HttpClient, private cookieService: CookieService) { }
  prefix = urls.dashBoard;
  checkPermission(prefix: string): Observable<boolean> {
    return this.httpClient.get<boolean>(prefix + "/checkPermission",
      appHeaders.httpOptions());
  }
  getVersionNumber(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.prefix + "/getVersionNumberService",
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
    return this.httpClient.get<TreeNode[]>(this.prefix + "/getEmail",
      {
        headers: appHeaders.getHeaders()
      });
  }
  logout(): void {
    this.httpClient.get<any>("/logout", appHeaders.httpOptions());
  }
  validate_monitoring(prefix: string) {
    this.checkPermission_Monitoring('http://localhost:9091' + '/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          this.router.navigate(['home']);
        }
      },
      error => {
        this.router.navigate(['home']);
      }
    );
  }
  validate_logging(prefix: string) {
    this.checkPermission_Loggig('http://localhost:9091' + '/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          this.router.navigate(['home']);
        }
      },
      error => {
        this.router.navigate(['home']);
      }
    );
  }
  validate(prefix) {
    this.checkPermission('http://localhost:9091' + '/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          this.router.navigate(['home']);
        }
      },
      error => {
        this.router.navigate(['home']);
      }
    );
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
