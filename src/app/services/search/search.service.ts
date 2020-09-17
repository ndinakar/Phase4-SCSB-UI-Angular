import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { urls } from 'src/config/urls';
import { appHeaders } from 'src/config/headers';
import { SearchRecordRequest } from 'src/app/model/SearchRecordRequest';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  //postData: SearchRecordRequest;
  constructor(private httpClient: HttpClient) { }
  baseUrl = urls.baseUrl;
  prefix = urls.search;
  getSearch(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/search", postData,
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
