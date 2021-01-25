import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appHeaders } from 'src/config/headers';
import { environment } from 'src/environments/environment';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  homeUrl = environment.homeUrl;
  baseUrl = urls.baseUrl;
  prefix = urls.login;

  getInstitutions(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/api/institutions",
      {
        headers: appHeaders.getHeaders()
      });
  }
  routeToAuth(institution) {
    if (window.location.href == this.homeUrl) {
      //window.location.replace(this.baseUrl + "/login-scsb?institution=" + institution);
      window.location.href = this.baseUrl + "/login-scsb?institution=" + institution;
    } else {
      window.location.replace(window.location.protocol + '//' + window.location.hostname + ':9091/home');
      console.log(window.location.href);
      window.location.href = this.baseUrl + "/login-scsb?institution=" + institution;
    }
  }
  loginCheck(): Observable<any> {
    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    return this.httpClient.get<any>(this.baseUrl + "/api/loginCheck", httpOptions);
  }
}
