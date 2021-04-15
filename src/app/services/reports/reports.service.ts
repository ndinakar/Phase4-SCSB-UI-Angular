import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { ReportsForm } from '@model/ReportsForm';
import { appHeaders } from '@config/headers';
import { urls } from '@config/urls';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private httpClient: HttpClient) { }
  prefix = urls.reports;
  prefix_request = urls.requests;

  firstCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  incompleteReportPageSizeChange(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/incompleteReportPageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  submit(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/submit", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  getInstitutions(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.prefix + "/getInstitutions",
      {
        headers: appHeaders.getHeaders()
      });
  }
  incompleteRecords(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/incompleteRecords", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  collectionGroupDesignation(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.prefix + "/collectionGroupDesignation",
      {
        headers: appHeaders.getHeaders()
      });
  }
  deaccessionInformation(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/deaccessionInformation", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  exportData(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/export", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  exceptionReports(institution: string, fromDate: string, toDate: string): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders_formData();
    let parames = new HttpParams()
      .set('institutionCode', institution)
      .set('fromDate', fromDate)
      .set('toDate', toDate);
    const options = {
      params: parames, headers: headers
    };
    return this.httpClient.get<TreeNode[]>(this.prefix_request + "/exportExceptionReportsWithDateRange", options);
  }
  pageSizeexceptionReports(institution: string, fromDate: string, toDate: string, pageSize: string): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders_formData();
    let parames = new HttpParams()
      .set('institutionCode', institution)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('pageSize', pageSize);
    const options = {
      params: parames, headers: headers
    };
    return this.httpClient.get<TreeNode[]>(this.prefix_request + "/exportExceptionReportsPageSizeChange", options);
  }
  nextCallexceptionReports(institution: string, fromDate: string, toDate: string, pageNumber: string, pageSize: string): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders_formData();
    let parames = new HttpParams()
      .set('institutionCode', institution)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    const options = {
      params: parames, headers: headers
    };
    return this.httpClient.get<TreeNode[]>(this.prefix_request + "/exportExceptionNextCall", options);
  }
  exportExceptionReports(institution: string, fromDate: string, toDate: string): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders_formData();
    let parames = new HttpParams()
      .set('institutionCode', institution)
      .set('fromDate', fromDate)
      .set('toDate', toDate);
    const options = {
      params: parames, headers: headers
    };
    return this.httpClient.get<TreeNode[]>(this.prefix_request + "/exportExceptionReports", options);
  }

  getTransactionReportCount(postData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix_request + "/transactionData", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  getTransactionReport(postData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix_request + "/transactionReports", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
