import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { RequestForm } from '@model/RequestForm';
import { appHeaders } from '@config/headers';
import { urls } from '@config/urls';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }
  PREFIX = urls.REQUESTS;
  createRequest(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/createRequest", postData, appHeaders.httpOptions());
  }
  populateItemtDetails(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/populateItem", postData, appHeaders.httpOptions());
  }
  loadCreateRequest(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + "/loadCreateRequest", appHeaders.httpOptions());
  }
  searchRequests(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/searchRequests", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  loadSearchRequest(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + "/loadSearchRequest", appHeaders.httpOptions());
  }
  goToSearchRequest(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/goToSearchRequest", postData, appHeaders.httpOptions());
  }
  resubmitRequest(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/resubmitRequest", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  cancelRequest(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/cancelRequest", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  firstCall(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  onRequestPageSizeChange(postData: RequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/requestPageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  refreshStatus(postData: string): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/refreshStatus", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }

}
