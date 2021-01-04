import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { RequestForm } from 'src/app/model/RequestForm';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl = urls.baseUrl;
  prefix = urls.requests;
  httpOptions(){
    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true
    };
    return httpOptions;
  }
  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  createRequest(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/createRequest", postData,this.httpOptions());
  }
  populateItemtDetails(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/populateItem", postData,this.httpOptions());
  }
  loadCreateRequest(): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/loadCreateRequest",
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchRequests(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/searchRequests", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  loadSearchRequest(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/loadSearchRequest",this.httpOptions());
  }
  goToSearchRequest(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/goToSearchRequest",postData,this.httpOptions());
  }
  resubmitRequest(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/resubmitRequest", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  cancelRequest(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/cancelRequest", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  firstCall(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  onRequestPageSizeChange(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/requestPageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }

}
