import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Router } from "@angular/router";
import { from, of } from 'rxjs';
import { RolesService } from './roles.service';
import { RolesForm }from 'src/app/model/RolesFrom';

describe('RolesService', () => {
 const postData ={
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
  let service: RolesService;

  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [RolesService, HttpClient, HttpHandler,Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new RolesService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('validate displyRecords() response',() => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.searchRoles(postData).subscribe((res) => 
    expect(res).toBeNaN);
  });
});
