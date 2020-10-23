import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { RolesForm } from 'src/app/model/RolesFrom';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private httpClient: HttpClient) { }
  baseUrl = urls.baseUrl;
  prefix = urls.roles;

  searchRoles(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/searchRoles", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  populatePermissionName(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/populatePermissionName",
      {
        headers: appHeaders.getHeaders()
      });
  }
  loadCreateRole(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/loadCreateRole", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  saveEditedRole(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/saveEditedRole", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  delete(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/delete", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  pageSizeChange(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/pageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previous(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  firstCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
