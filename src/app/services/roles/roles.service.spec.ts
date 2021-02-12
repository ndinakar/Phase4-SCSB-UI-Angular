import { HttpClient, HttpHandler } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, inject, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { of } from 'rxjs';
import { RolesService } from './roles.service';

describe('RolesService', () => {

  let service: RolesService;

  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [RolesService, HttpClient, Router],
      imports: [
        HttpClientTestingModule
      ]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new RolesService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  const postData = {
    "roleName": "",
    "roleDescription": null,
    "permissionNames": "",
    "showResults": false,
    "newRole": false,
    "totalRecordCount": "0",
    "errorMessage": null,
    "pageNumber": 0,
    "pageSize": 10,
    "totalPageCount": 0,
    "afterDelPageNumber": 0,
    "afterDelPageSize": 10,
    "afterDelTotalPageCount": 0,
    "message": null,
    "newRoleName": null,
    "newRoleDescription": null,
    "newPermissionNames": null,
    "editRoleName": null,
    "editRoleDescription": null,
    "editPermissionNames": null,
    "editPermissionName": [],
    "roleNameForDelete": null,
    "roleDescriptionForDelete": null,
    "permissionNamesForDelete": null,
    "permissionNameList": [],
    "selectedPermissionNames": [],
    "roleId": null,
    "rolesSearchResults": [],
    "showIntial": true
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('validate searchRoles response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.searchRoles(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate populatePermissionName response', () => {
    httpClientSpy.get.and.returnValues(of(postData));
    service.populatePermissionName().subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate createRole response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.createRole(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate saveEditedRole response', async(inject([RolesService], (service: RolesService) => {
    httpClientSpy.post.and.returnValues(of());
    service.saveEditedRole('test', 'test', 'test', 'test').subscribe((res) =>
      expect(res).toBeNaN);
  })));
  it('validate editRole response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.editRole(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate delete response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.delete(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate pageSizeChange response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.pageSizeChange(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate previousCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.previousCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate nextCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.nextCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate firstCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.firstCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate lastCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.lastCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
});
