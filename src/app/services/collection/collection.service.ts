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

  getCollection(): Observable<CollectionForm[]> {
    this.baseUrl = urls.baseUrl;
    return this.httpClient.post<CollectionForm[]>(this.baseUrl + this.prefix + "/collection", {},
      {
        headers: appHeaders.getHeaders()
      });
  }
  displyRecords(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/displayRecords", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  openMarcView(): Observable<CollectionForm[]> {
    return this.httpClient.post<CollectionForm[]>(this.baseUrl + this.prefix + "/openMarcView", {},
      {
        headers: appHeaders.getHeaders()
      });
  }
  updateCollection(): Observable<CollectionForm[]> {
    return this.httpClient.post<CollectionForm[]>(this.baseUrl + this.prefix + "/collectionUpdate", {},
      {
        headers: appHeaders.getHeaders()
      });
  }
  checkCrossInstitutionBorrowed(): Observable<CollectionForm[]> {
    return this.httpClient.post<CollectionForm[]>(this.baseUrl + this.prefix + "/checkCrossInstitutionBorrowed", {},
      {
        headers: appHeaders.getHeaders()
      });
  }

}
