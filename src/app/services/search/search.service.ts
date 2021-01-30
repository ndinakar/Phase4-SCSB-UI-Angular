import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { SearchRecordRequest } from 'src/app/model/SearchRecordRequest';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpClient: HttpClient) { }
  prefix = urls.search;

  getSearch(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/searchResults", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchLast(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchFirst(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchPrevious(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchNext(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }

  onPageSizeChange(postData: SearchRecordRequest): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/pageChanges", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
