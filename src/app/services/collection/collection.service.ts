import { Injectable, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { from, Observable } from 'rxjs';
import { urls } from 'src/config/urls';
import { appHeaders } from 'src/config/headers';
import { CollectionForm } from 'src/app/model/CollectionForm';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class CollectionService {
  baseUrl = urls.baseUrl;
  prefix = urls.collection;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  displyRecords(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/displayRecords", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  openMarcView(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/openMarcView", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  updateCollection(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/collectionUpdate", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  checkCrossInstitutionBorrowed(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/checkCrossInstitutionBorrowed", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  checkCrossInstitution(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/checkCrossInstitutionBorrowed", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
