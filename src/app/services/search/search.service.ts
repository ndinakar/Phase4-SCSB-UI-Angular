import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { SearchRecordRequest } from 'src/app/model/SearchRecordRequest';
import { AppConfig } from 'src/config/app.config.service';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }
  baseUrl = urls.baseUrl;
  prefix = urls.search;
  httpOptions(){
    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true
    };
    return httpOptions;
  }
  checkPermission(prefix: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/'+ prefix + "/checkPermission",
     this.httpOptions());
  }
  getSearch(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/searchResults", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchLast(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchFirst(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchPrevious(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchNext(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }

  onPageSizeChange(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/pageChanges", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
