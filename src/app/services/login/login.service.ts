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

  getInstitutions(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseUrl + "/home/institutions",
      {
        headers: appHeaders.getHeaders()
      });
  }
}
