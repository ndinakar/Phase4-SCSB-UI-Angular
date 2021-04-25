import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appHeaders } from '@config/headers';
import { urls } from '@config/urls';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  homeUrl = environment.homeUrl;
  casPrefix = urls.CAS_PREFIX;
  API = urls.API;

  getInstitutions(): Observable<any> {
    return this.httpClient.get<any>(this.API + '/institutions',
      {
        headers: appHeaders.getHeaders()
      });
  }
  loginCheck(): Observable<any> {
    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    return this.httpClient.get<any>(this.API + '/loginCheck', httpOptions);
  }
}
