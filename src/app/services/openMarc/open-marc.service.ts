import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class OpenMarcService {
  constructor(private httpClient: HttpClient) { }
  PREFIX = urls.OPEN_MARC;
  openMarc(bibId: any): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders();
    let parames = new HttpParams()
      .set('bibId', bibId);
    const options = { params: parames, headers: headers };
    return this.httpClient.get<TreeNode[]>(this.PREFIX, options);
  }
}
