import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  resVal: TreeNode[];
  baseUrl = urls.baseUrl;

  constructor(private http: HttpClient,
    private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    return this.http.get(this.baseUrl + '/home/loginCheck', httpOptions).pipe(
      map(res => {
        if (!res) {
          alert("User Not valid to Move");
          this.router.navigate(['/home']);
          return false;
        } else {
          return true;
        }
      }),
      catchError((err) => {
        this.router.navigate(['/home']);
        return of(false);
      })
    );

  }
}



