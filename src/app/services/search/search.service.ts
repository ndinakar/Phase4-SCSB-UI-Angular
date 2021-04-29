import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { SearchRecordRequest } from '@model/SearchRecordRequest';
import { appHeaders } from '@config/headers';
import { urls } from '@config/urls';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpClient: HttpClient) { }
  PREFIX = urls.SEARCH;

  getSearch(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/searchResults", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchLast(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchFirst(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchPrevious(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchNext(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }

  onPageSizeChange(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/pageChanges", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
