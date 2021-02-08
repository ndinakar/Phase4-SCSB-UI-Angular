import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  homeUrl = environment.homeUrl;
  casPrefix = urls.casPrefix;
  api = urls.api;

  getInstitutions(): Observable<any> {
    return this.httpClient.get<any>(this.api + '/institutions',
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
    return this.httpClient.get<any>(this.api + '/loginCheck', httpOptions);
  }
}
