import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { ReportsForm } from 'src/app/model/ReportsForm';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private httpClient: HttpClient) { }
  baseUrl = urls.baseUrl;
  prefix = urls.reports;

  firstCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  incompleteReportPageSizeChange(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/incompleteReportPageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  submit(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/submit", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  getInstitutions(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/getInstitutions",
      {
        headers: appHeaders.getHeaders()
      });
  }
  incompleteRecords(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/incompleteRecords", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  collectionGroupDesignation(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/collectionGroupDesignation",
      {
        headers: appHeaders.getHeaders()
      });
  }
  deaccessionInformation(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/deaccessionInformation", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  exportData(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/export", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }

}
