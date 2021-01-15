import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  baseUrl = urls.baseUrl;
  prefix = urls.login;

  getInstitutions(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/api/institutions",
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
    return this.httpClient.get<any>(this.baseUrl + "/api/loginCheck",httpOptions);
  }
}
