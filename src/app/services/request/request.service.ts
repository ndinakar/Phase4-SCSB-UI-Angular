import { Injectable, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { from, Observable } from 'rxjs';
import { urls } from 'src/config/urls';
import { appHeaders } from 'src/config/headers';
import { TreeNode } from 'primeng/api';
import { RequestForm } from 'src/app/model/RequestForm';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl = urls.baseUrl;
  prefix = urls.requests;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  createRequest(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/createRequest", postData,
      {
        headers: appHeaders.getHeaders()
      });
  } 
  populateItemtDetails(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/populateItem", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  loadCreateRequest(): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/loadCreateRequest",
      {
        headers: appHeaders.getHeaders()
      });
  }
}
