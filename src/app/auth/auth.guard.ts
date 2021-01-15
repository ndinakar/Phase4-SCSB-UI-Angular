import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RolesPermissionsService } from 'src/app/services/rolesPermissions/roles-permissions.service';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  resVal: Object;
  baseUrl = urls.baseUrl;

  constructor(private http: HttpClient,
    private router: Router, private rolesService: RolesPermissionsService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    return this.http.get(this.baseUrl + '/api/loginCheck', httpOptions).pipe(
      map(res => {
        this.resVal = res.body;
        if (!res.body['isAuthenticated']) {
          this.router.navigate(['/home']);
          return false;
        } else {
          this.rolesService.setRes(this.resVal);
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



