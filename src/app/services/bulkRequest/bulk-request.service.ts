import { HttpClient, HttpParams } from "@angular/common/http";
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
  prefix = urls.bulkRequest

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  loadCreateRequest(): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/loadCreateRequest",
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
    return this.httpClient.post<any>(this.prefix + "/createBulkRequest", formdata,
      options);
  }
  populateDeliveryLocations(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/populateDeliveryLocations", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  searchRequest(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/searchRequest", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }

  firstCall(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  onRequestPageSizeChange(postData: BulkRequestForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/requestPageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  downloadReports(requestId: string): Observable<any> {
    return this.httpClient.get<any>(this.prefix + '/' + requestId,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
