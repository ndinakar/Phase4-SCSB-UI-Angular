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
  PREFIX = urls.ROLES;
  searchRoles(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/searchRoles", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  populatePermissionName(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + "/populatePermissionName",
      {
        headers: appHeaders.getHeaders()
      });
  }
  createRole(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/createRole", postData,
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
    return this.httpClient.get<TreeNode[]>(this.PREFIX + "/saveEditedRole", options);
  }
  editRole(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/editRole", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  delete(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/delete", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  pageSizeChange(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/pageSizeChange", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  firstCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: RolesForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
