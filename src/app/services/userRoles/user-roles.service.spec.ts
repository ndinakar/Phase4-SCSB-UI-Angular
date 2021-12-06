import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { UserRolesService } from './user-roles.service';

describe('UserRolesService', () => {
  let service: UserRolesService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [UserRolesService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new UserRolesService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  const postData = {
    "userId": null,
    "institutionId": null,
    "editUserId": 0,
    "roleId": null,
    "editRoleId": null,

    "pageNumber": 0,
    "pageSize": 10,
    "totalPageCount": 0,
    "editInstitutionId": null,
    "afterDelPageNumber": 0,
    "afterDelPageSize": 10,
    "afterDelTotalPageCount": 0,

    "searchNetworkId": null,
    "networkLoginId": null,
    "roleName": null,
    "totalRecordsCount": "0",
    "institutionName": null,
    "message": null,
    "errorMessage": null,
    "errorMessageForEmail": null,
    "editErromessage": null,
    "sectionName": null,
    "buttonName": null,
    "editNetworkId": null,
    "userDescriptionErrMsg": null,
    "userDescription": null,
    "editNetworkLoginId": null,
    "editUserDescription": null,
    "userEmailId": null,
    "emailId": null,
    "editEmailId": null,

    "allowCreateEdit": null,
    "isCreatedRequest": null,
    "showPagination": false,
    "showSearch": false,
    "showErrorMessage": false,
    "showCreateSuccess": false,
    "showCreateError": false,
    "showEditSuccess": false,
    "showEditError": false,
    "showCreateEmailError": false,
    "deleteSuccessMsg": false,
    "selected": null,
    "submitted": null,
    "showResults": false,
    "deletedSuccessMsg": false,
    "deleteErrorMsg": false,
    "showUserSearchView": true,

    "roles": [],
    "institutions": [],
    "showSelectedForCreate": [],
    "selectedForCreate": [],
    "editSelectedForCreate": [],
    "userRoleFormList": [],

    "showEditDeleteIcon": true,

    "createdBy": null,
    "lastUpdatedBy": null
  }
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('displayJobs response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.searchRoles(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  //
  it('previousCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.previousCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('nextCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.nextCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('firstCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.firstCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('lastCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.lastCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('pageSize response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.pageSize(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('userRoles response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.userRoles().subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('createUser response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.createUser(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  //editUser  saveEditUser  delete
  it('editUser response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.editUser('test', 'test').subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('saveEditUser response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.saveEditUser('test', 'test', 'test', 'test', 'test', 'test').subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('delete response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.delete('test', 'test', 'test', 'test', 'test').subscribe((res) =>
      expect(res).toBeNaN);
  });
});
