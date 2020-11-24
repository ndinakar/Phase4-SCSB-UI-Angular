import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { CollectionForm } from 'src/app/model/CollectionForm';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = urls.baseUrl;
  prefix = urls.admin;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  upload(file: File): Observable<string> {
    const formdata: FormData = new FormData();
    formdata.append('file', file, file.name); 
    return this.httpClient.post<string>(this.baseUrl + this.prefix + "/upload", formdata,
      {
        headers: appHeaders.getHeadersXmlUpload()
      });
  }
}
