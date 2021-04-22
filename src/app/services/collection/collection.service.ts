import { HttpClient } from "@angular/common/http";
import { error } from "@angular/compiler/src/util";
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { CollectionForm } from 'src/app/model/CollectionForm';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})

export class CollectionService {
  PREFIX = urls.COLLECTION;
  constructor(private httpClient: HttpClient) { }

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
