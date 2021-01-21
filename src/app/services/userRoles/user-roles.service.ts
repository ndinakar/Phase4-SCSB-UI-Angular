import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { UserRoleFormData } from 'src/app/model/UserRoleFormData';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  constructor(private httpClient: HttpClient) { }
  baseUrl = urls.baseUrl;
  prefix = urls.userRoles;
  searchRoles(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/searchUsers", postData, appHeaders.httpOptions());
  }
  previousCall(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/previous", postData, appHeaders.httpOptions());
  }
  nextCall(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/next", postData, appHeaders.httpOptions());
  }
  firstCall(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/first", postData, appHeaders.httpOptions());
  }
  lastCall(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/last", postData, appHeaders.httpOptions());
  }
  pageSize(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/searchUsers", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  userRoles(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/userRoles",
      appHeaders.httpOptions());
  }
  editUser(userId, networkLoginId): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders();
    let parames = new HttpParams()
      .set('userId', userId)
      .set('networkLoginId', networkLoginId);
    const options = { params: parames, headers: headers, withCredentials: true };
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/editUser", options);
  }
  saveEditUser(userId, roleIds, networkLoginId, userDescription, institutionId, userEmailId): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders();
    let parames = new HttpParams()
      .set('userId', userId)
      .set('networkLoginId', networkLoginId)
      .set('userDescription', userDescription)
      .set('institutionId', institutionId)
      .set('userEmailId', userEmailId)
      .set('roleIds', roleIds);
    const options = { params: parames, headers: headers, withCredentials: true };
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/saveEditUserDetails", options);
  }

  createUser(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/createUser", postData,
      appHeaders.httpOptions());
  }
  delete(userId, networkLoginId, pageNumber, totalPageCount, pageSize): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders();
    let parames = new HttpParams()
      .set('userId', userId)
      .set('networkLoginId', networkLoginId)
      .set('pageNumber', pageNumber)
      .set('totalPageCount', totalPageCount)
      .set('pageSize', pageSize);
    const options = { params: parames, headers: headers, withCredentials: true };
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/delete", options);
  }
}
