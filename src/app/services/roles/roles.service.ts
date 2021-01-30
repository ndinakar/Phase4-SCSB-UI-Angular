import { HttpClient, HttpParams } from '@angular/common/http';
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
  prefix = urls.roles;
  searchRoles(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/searchRoles", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  populatePermissionName(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.prefix + "/populatePermissionName",
      {
        headers: appHeaders.getHeaders()
      });
  }
  createRole(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/createRole", postData,
      appHeaders.httpOptions());
  }
  saveEditedRole(roleId, roleName, roleDescription, permissionNames): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders();
    let parames = new HttpParams()
      .set('roleId', roleId)
      .set('roleName', roleName)
      .set('roleDescription', roleDescription)
      .set('editPermissionNames', permissionNames);
    const options = { params: parames, headers: headers, withCredentials: true };
    return this.httpClient.get<TreeNode[]>(this.prefix + "/saveEditedRole", options);
  }
  editRole(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/editRole", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  delete(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/delete", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  pageSizeChange(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/pageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  firstCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
