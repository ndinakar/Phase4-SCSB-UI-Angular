import { HttpClient, HttpParams } from "@angular/common/http";
import { STRING_TYPE } from "@angular/compiler";
import { stringify } from "@angular/compiler/src/util";
import { Inject, Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { BulkRequestForm } from 'src/app/model/BulkRequestForm';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class BulkRequestService {
  baseUrl = urls.baseUrl;
  prefix = urls.bulkRequest

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  loadCreateRequest(): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/loadCreateRequest",
      {
        headers: appHeaders.getHeaders()
      });
  }
  createBulkRequest(deliveryLocation: string, requestingInstitutionId: string,
    patronBarcodeId: string, BulkRequestName: string, choosenFile:
      string, patronEmailId: string, file: File):
    Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append('file', file, file.name);
    let headers = appHeaders.getHeaders_formData();
    let parames = new HttpParams()
      .set('deliveryLocation', deliveryLocation)
      .set('requestingInstitutionId', requestingInstitutionId)
      .set('patronBarcodeId', patronBarcodeId)
      .set('BulkRequestName', BulkRequestName)
      .set('choosenFile', choosenFile)
      .set('patronEmailId', patronEmailId);
    const options = {
      params: parames, headers: headers,
      withCredentials: true
    };
    return this.httpClient.post<String>(this.baseUrl + this.prefix + "/createBulkRequest", formdata,
      options);
  }
  populateDeliveryLocations(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/populateDeliveryLocations", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchRequest(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/searchRequest", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }

  firstCall(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  onRequestPageSizeChange(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/requestPageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  downloadReports(requestId: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.prefix + '/' + requestId,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
