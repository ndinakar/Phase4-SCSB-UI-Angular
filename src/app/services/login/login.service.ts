import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
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
    return this.httpClient.get<string[]>(this.baseUrl + this.prefix + "/institutions",
      {
        headers: appHeaders.getHeaders()
      });
  }
  getserviceUrl(institutionName: string): Observable<any> {
    let headers = appHeaders.getHeaders();
    let parames = new HttpParams()
      .set('institutionName', institutionName);
    const options = { params: parames, headers: headers };
    return this.httpClient.get<any>(this.baseUrl + this.prefix + "/serviceUrl",
    options);
  }
}
