import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appHeaders } from '@config/headers';
import { urls } from '@config/urls';
import { ReportsForm } from '@model/ReportsForm';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private httpClient: HttpClient) { }
  PREFIX = urls.REPORTS;
  PREFIX_REQUEST = urls.REQUESTS;

  firstCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  incompleteReportPageSizeChange(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/incompleteReportPageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  submit(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/submit", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  getInstitutions(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + "/getInstitutions",
      {
        headers: appHeaders.getHeaders()
      });
  }
  incompleteRecords(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/incompleteRecords", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  collectionGroupDesignation(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + "/collectionGroupDesignation",
      {
        headers: appHeaders.getHeaders()
      });
  }
  deaccessionInformation(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/deaccessionInformation", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  exportData(postData: ReportsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/export", postData,
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
    return this.httpClient.get<TreeNode[]>(this.PREFIX_REQUEST + "/exportExceptionReportsWithDateRange", options);
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
    return this.httpClient.get<TreeNode[]>(this.PREFIX_REQUEST + "/exportExceptionReportsPageSizeChange", options);
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
    return this.httpClient.get<TreeNode[]>(this.PREFIX_REQUEST + "/exportExceptionNextCall", options);
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
    return this.httpClient.get<TreeNode[]>(this.PREFIX_REQUEST + "/exportExceptionReports", options);
  }

  getTransactionReportCount(postData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX_REQUEST + "/transactionData", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  getTransactionReport(postData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX_REQUEST + "/transactionReports", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
