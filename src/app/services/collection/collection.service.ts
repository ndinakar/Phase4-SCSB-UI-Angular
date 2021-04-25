import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { appHeaders } from '@config/headers';
import { urls } from '@config/urls';
import { CollectionForm } from '@model/CollectionForm';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CollectionService {
  constructor(private httpClient: HttpClient) { }
  PREFIX = urls.COLLECTION;
  displyRecords(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/displayRecords", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  openMarcView(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/openMarcView", postData, appHeaders.httpOptions());
  }
  updateCollection(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/collectionUpdate", postData, appHeaders.httpOptions());
  }
  checkCrossInstitutionBorrowed(postData: CollectionForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/checkCrossInstitutionBorrowed", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
