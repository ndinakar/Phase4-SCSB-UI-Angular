import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { from, Observable } from 'rxjs';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
import { UserRoleFormData } from 'src/app/model/UserRoleFormData';
@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  constructor(private httpClient: HttpClient) { }
  baseUrl = urls.baseUrl;
  prefix = urls.userRoles;

  searchRoles(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/searchUsers", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  previousCall(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/previous", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  nextCall(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/next", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  firstCall(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/first", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  lastCall(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/last", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  pageSize(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/searchUsers", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  userRoles(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/userRoles",
      {
        headers: appHeaders.getHeaders()
      });
  }
  editUser(userId,networkLoginId): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders();
    let parames = new HttpParams()
      .set('userId', userId)
      .set('networkLoginId', networkLoginId);
    const options = { params: parames, headers: headers };
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/editUser",options);
  }
  saveEditUser(userId,roleIds,networkLoginId,userDescription,institutionId,userEmailId): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders();
    let parames = new HttpParams()
      .set('userId', userId)
      .set('networkLoginId', networkLoginId)
      .set('userDescription',userDescription)
      .set('institutionId',institutionId)
      .set('userEmailId',userEmailId)
      .set('roleIds',roleIds);
    const options = { params: parames, headers: headers };
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/saveEditUserDetails",options);
  }
  
  createUser(postData: UserRoleFormData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/createUser", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
  delete(userId,networkLoginId,pageNumber,totalPageCount,pageSize): Observable<TreeNode[]> {
    let headers = appHeaders.getHeaders();
    let parames = new HttpParams()
      .set('userId', userId)
      .set('networkLoginId', networkLoginId)
      .set('pageNumber',pageNumber)
      .set('totalPageCount',totalPageCount)
      .set('pageSize',pageSize);
    const options = { params: parames, headers: headers };
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/delete", options);
  }
}
