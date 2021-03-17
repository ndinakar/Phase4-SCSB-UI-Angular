import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  res: Object;
  isAuthenticated = false;
  constructor(private router: Router, private httpClient: HttpClient) { }
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
    this.checkPermission_Monitoring('/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          //this.logout();
          this.router.navigate(['home']);
        }
      },
      error => {
        this.router.navigate(['home']);
      }
    );
  }
  validate_logging(prefix: string) {
    this.checkPermission_Loggig('/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          //this.logout();
          this.router.navigate(['home']);
        }
      },
      error => {
        this.router.navigate(['home']);
      }
    );
  }
  validate(prefix) {
    this.checkPermission('/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          //this.logout();
          this.router.navigate(['home']);
        }
      },
      error => {
        this.router.navigate(['home']);
      }
    );
  }
}
