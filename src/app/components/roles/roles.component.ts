import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { EMPTY } from 'rxjs';
import { RolesService } from 'src/app/services/roles/roles.service';
declare var $: any;
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private rolesService: RolesService) { }

  ngOnInit(): void {
    $('#mydiv').hide();
  }
  rolesVal : TreeNode[];

  rolesPanel = true;
  showResults = false;
  createRoleSectionDiv = false;

  successDiv = false;
  errorMessageDiv = false;
  rolesSearchResultsDiv = false;
  editRoleSectionDiv = false;
  deleteRoleSectionDiv = false;

  lastbutton=true;
  firstbutton=true;
  previousbutton=true;
  nextbutton=true;

  showentries = 10;
  roleName: string;
  permissionName: string;
  postData ={
    "roleName": null,
    "roleDescription": null,
    "permissionNames": null,
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
  searchRoles(){

    if(this.roleName == null && this.permissionName==null){
        this.roleName = "";
        this.permissionName = "";
    } else if(this.roleName == null){
      this.roleName = "";
    }else if(this.permissionName == null){
      this.permissionName = "";
    }

    this.postData ={
      "roleName": this.roleName,
      "roleDescription": null,
      "permissionNames": this.permissionName,
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
    this.rolesService.searchRoles(this.postData).subscribe(
      (res) => {
        this.rolesVal = res;
        this.showResults = true;
        if(this.rolesVal['rolesSearchResults'] != EMPTY){
          this.rolesSearchResultsDiv =true;
          this.errorMessageDiv = false;
        }
        if(this.rolesVal['errorMessage'] != null){
          this.errorMessageDiv = true;
          this.rolesSearchResultsDiv = false;
        }
        this.pagination();
      });
  }
  resetFields(){
    this.roleName = "";
    this.permissionName = "";
  }
  editRole(roleId,roleName,roleDescription,permissionName){
    this.showResults = false;
    this.rolesPanel = false;
    this.rolesSearchResultsDiv = false;
    this.editRoleSectionDiv = true;
    this.deleteRoleSectionDiv = false;
    this.createRoleSectionDiv = false;
  }
  deleteRole(roleId,roleName,roleDescription,permissionName){
    console.log("test",roleId)
    this.showResults = false;
    this.rolesPanel = false;
    this.rolesSearchResultsDiv = false;
    this.editRoleSectionDiv = false;
    this.deleteRoleSectionDiv = true;
  }
  createRole(){
    this.populatePermissionNames();
    this.showResults = false;
    this.rolesPanel = false;
    this.rolesSearchResultsDiv = false;
    this.editRoleSectionDiv = false;
    this.deleteRoleSectionDiv = false;
    this.createRoleSectionDiv = true;
  }
  populatePermissionNames(){}
  firstCall(){}
  lastCall(){}
  previousCall(){}
  nextCall(){}
  pageSizeChange(size){}
  pagination() {
    if (this.rolesVal['pageNumber'] == 0 && (this.rolesVal['totalPageCount'] - 1 > 0)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = false;
      this.lastbutton = false;
    } else if (this.rolesVal['pageNumber'] == 0 && (this.rolesVal['pageNumber'] == this.rolesVal['totalPageCount'] - 1)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = true;
      this.lastbutton = true;
    }
    else if ((this.rolesVal['pageNumber'] == this.rolesVal['totalPageCount'] - 1) && this.rolesVal['totalPageCount'] - 1 > 0) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = true;
      this.lastbutton = true;
    } else if ((this.rolesVal['pageNumber'] < this.rolesVal['totalPageCount'] - 1) && (this.rolesVal['pageNumber'] != 0)) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = false;
      this.lastbutton = false;
    } else if (this.rolesVal['pageNumber'] == 0 && this.rolesVal['totalPageCount'] == 0) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = true;
      this.lastbutton = true;
    }
  }
}
