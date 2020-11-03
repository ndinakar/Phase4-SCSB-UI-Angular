import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { EMPTY } from 'rxjs';
import { UserRolesService } from 'src/app/services/userRoles/user-roles.service';
@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

  constructor(private userRolesService: UserRolesService) { }

  ngOnInit(): void {
  }
  roleId: string;
  searchNetworkId: string;
  userEmailId: string;
  showUserSearchView = true;
  showSearchResultsDiv = false;
  errorMessageforSearchDiv = false;
  deletedSuccessMsgDiv = false;
  errorMessageDiv = false;
  createUserDiv = false;
  createErrorMessageDiv = false;
  createEmailMessageDiv = false;
  createSuccussMessageDiv = false;
  searchRowResultsDiv = false;
  editusersDiv = false;
  deleteUserDiv = false;
  searchShowResultsDiv = false;
  searchResultsDiv = false;
  totalRecordsCountDiv = false;
  userRolePaginationDiv = false;
  userRoleFormVal: TreeNode[];
  userRolesVal: TreeNode[];
  userRoleListVal: TreeNode[];
  userResponse: TreeNode[];

  lastbutton = true;
  firstbutton = true;
  previousbutton = true;
  nextbutton = true;

  searchResultContainerDiv = false;
  pageNumber: number;
  institutionId: number;
  institutionIdErrMsgDiv = false;
  roleIdErrMsgDiv = false;
  //edit User
  editEmailId: string;
  edituserDescription = "";
  editnetworkLoginId: string;
  editinstitutionId: string;
  editroleId: number[];
  editsuccessMsgDiv = false;
  editerrormsgDiv = false;
  editinstitutionIdErrMsgDiv = false;
  editroleIdErrMsgDiv = false;
  //delete User
  deleteNetworkLoginId: string;
  deleteInstitutionId: string;
  deletedRoleId: string[];
  deleteUserDescription: string;
  deleteEmailId: string;
  deleteErrorMsgDiv = false;

  numOfRecordsId = 10;
  //create User
  emailId: string;
  userDescription = "";
  rolesOption: number[];
  //institutionId : string;
  networkLoginId: string;
  selectedForCreate: number[];
  editUserId: number;
  userId: number;
  searchBarDiv = true;

  userDescriptionErrMsgDiv = false;
  edituserDescriptionErrMsgDiv = false;
  editEmailIdErrMsgDiv = false;
  emailIdErrMsgDiv = false;

  postData = {
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
  enableCreateUser() {
    this.userRoles();
    this.createUserDiv = true;
    this.errorMessageDiv = false;
    this.showUserSearchView = false;
    this.deleteUserDiv = false;
  }
  editUser(userId, networkLoginId, roleName) {
    this.editusersDiv = true;
    this.createUserDiv = false;
    this.showSearchResultsDiv = false;
    this.errorMessageDiv = false;
    this.searchResultsDiv = false;
    this.deleteUserDiv = false;
    this.showUserSearchView = false;
    this.editsuccessMsgDiv = false;
    this.editerrormsgDiv = false;
    this.userId = userId;
    this.userRolesService.editUser(userId, networkLoginId).subscribe(
      (res) => {
        this.userResponse = res;
        this.userRoleListVal = this.userResponse['roles'].map(function (x) { return { id: x[0], name: x[1] }; });
        this.editroleId = this.userResponse['editSelectedForCreate'];
        this.editEmailId = this.userResponse['editEmailId'];
        this.edituserDescription = this.userResponse['editUserDescription'];
        this.editnetworkLoginId = this.userResponse['editNetworkLoginId'];
        this.editinstitutionId = this.userResponse['editInstitutionId'];
        console.log("roleName", this.editroleId);
        console.log("userResponse", this.userResponse);

      });
  }
  deleteUserRole(userId, networkLoginId, roleName) {
    this.editusersDiv = false;
    this.createUserDiv = false;
    this.showSearchResultsDiv = false;
    this.errorMessageDiv = false;
    this.searchResultsDiv = false;
    this.deleteUserDiv = true;
    this.showUserSearchView = false;
    this.editsuccessMsgDiv = false;
    this.editerrormsgDiv = false;
    this.userId = userId;
    //this.deletePageNumber = 
    this.userRolesService.editUser(userId, networkLoginId).subscribe(
      (res) => {
        this.userResponse = res;
        this.userRoleListVal = this.userResponse['roles'].map(function (x) { return { id: x[0], name: x[1] }; });
        this.deleteEmailId = this.userResponse['editEmailId'];
        this.deleteUserDescription = this.userResponse['editUserDescription'];
        this.deleteNetworkLoginId = this.userResponse['editNetworkLoginId'];
        this.deleteInstitutionId = this.userResponse['editInstitutionId'];
        this.deletedRoleId = this.userResponse['editSelectedForCreate'];
      });
  }
  searchUserRoles() {
    this.userRolesService.searchRoles(this.setPostData('searchUsers')).subscribe(
      (res) => {
        this.userRoleFormVal = res;
        if (this.userRoleFormVal['message'] != null) {
          this.searchResultsDiv = true;
          this.searchResultContainerDiv = true;
          this.errorMessageforSearchDiv = true;
          this.showSearchResultsDiv = false;
          this.searchRowResultsDiv = false;
          this.totalRecordsCountDiv = false;
          this.userRolePaginationDiv = false;
          console.log(this.userRoleFormVal['message']);
        } else if (this.userRoleFormVal['errorMessage'] != null) {
          this.errorMessageforSearchDiv = false;
        } else {
          this.pagination();
          this.searchResultContainerDiv = true;
          this.searchResultsDiv = true;
          this.showSearchResultsDiv = true;
          this.errorMessageDiv = false;
          this.showUserSearchView = true;
          this.errorMessageforSearchDiv = false;
          this.deletedSuccessMsgDiv = false;
          this.searchShowResultsDiv = true;
          this.searchRowResultsDiv = true;
          this.totalRecordsCountDiv = true;
          this.userRolePaginationDiv = true;
        }

      }
    );
  }
  showEntriesChange(pageSize) {
    this.numOfRecordsId = pageSize;
    this.userRolesService.pageSize(this.setPostData('pageSize')).subscribe(
      (res) => {
        this.userRoleFormVal = res;
        this.pagination();
      });
  }
  createUser(emailId, userDescription, institutionId, networkLoginId) {
    this.emailId = emailId;
    this.userDescription = userDescription;
    this.selectedForCreate = this.rolesOption;
    this.institutionId = institutionId;
    this.networkLoginId = networkLoginId;
    if (!this.check('createUser')) {
      this.emailIdErrMsgDiv = true;
      this.userRolesService.createUser(this.setPostData('createUser')).subscribe(
        (res) => {
          this.userRoleFormVal = res;
          this.createUserDiv = true;
          this.showSearchResultsDiv = false;
          this.errorMessageDiv = false;
          this.searchResultsDiv = false;
          this.deleteUserDiv = false;
          this.showUserSearchView = false;
          this.editsuccessMsgDiv = false;
          this.editerrormsgDiv = false;
          if (this.userRoleFormVal['message'] != null) {
            this.createSuccussMessageDiv = true;
            this.createErrorMessageDiv = false;
          } else if (this.userRoleFormVal['errorMessage'] != null) {
            this.createSuccussMessageDiv = false;
            this.createErrorMessageDiv = true;
          }
          this.emailId = '';
          this.userDescription = '';
          this.rolesOption = null;
          this.institutionId = null;
          this.networkLoginId = '';
        });
    }
  }
  validateEmailAddress(val) {
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

    if (pattern.test(val)) {
      return false
    } else {
      return true;
    }
  }
  check(actionType) {
    if (actionType == 'createUser') {
      if (this.userDescription == '' && this.validateEmailAddress(this.emailId)) {
        this.userDescriptionErrMsgDiv = true;
        this.emailIdErrMsgDiv = true;
        this.createSuccussMessageDiv = false;
        this.createErrorMessageDiv = false;
        return true;
      } else if (this.userDescription == '') {
        this.userDescriptionErrMsgDiv = true;
        this.emailIdErrMsgDiv = false;
        this.createSuccussMessageDiv = false;
        this.createErrorMessageDiv = false;
        return true;
      } else if (this.validateEmailAddress(this.emailId)) {
        this.userDescriptionErrMsgDiv = false;
        this.emailIdErrMsgDiv = true;
        this.createSuccussMessageDiv = false;
        this.createErrorMessageDiv = false;
        return true;
      } else {
        return false;
      }
    } else if (this.edituserDescription == '' && this.validateEmailAddress(this.editEmailId)) {
      this.edituserDescriptionErrMsgDiv = true;
      this.editEmailIdErrMsgDiv = true;
      this.editsuccessMsgDiv = false;
      this.editerrormsgDiv = false;
      return true;
    } else if (this.edituserDescription == '') {
      this.edituserDescriptionErrMsgDiv = true;
      this.editEmailIdErrMsgDiv = false;
      this.editsuccessMsgDiv = false;
      this.editerrormsgDiv = false;
      return true;
    } else if (this.validateEmailAddress(this.editEmailId)) {
      this.edituserDescriptionErrMsgDiv = false;
      this.editEmailIdErrMsgDiv = true;
      this.editsuccessMsgDiv = false;
      this.editerrormsgDiv = false;
      return true;
    }else{
      return false;
    }
  }
  saveEditUser(networkLoginId, userDescription, institutionId, userEmailId) {
    if (!this.check('saveUser')) {
      this.userRolesService.saveEditUser(this.userId, this.editroleId, networkLoginId, userDescription, institutionId, userEmailId).subscribe(
        (res) => {
          this.userRoleFormVal = res;
          this.editusersDiv = true;
          this.createUserDiv = false;
          this.showSearchResultsDiv = false;
          this.errorMessageDiv = false;
          this.searchResultsDiv = false;
          this.deleteUserDiv = false;
          this.showUserSearchView = false;
          this.editsuccessMsgDiv = false;
          this.editerrormsgDiv = false;
          if (this.userRoleFormVal['message'] != null) {
            this.editsuccessMsgDiv = true;
            this.editerrormsgDiv = false;
          } else if (this.userRoleFormVal['errorMessage'] != null) {
            this.editsuccessMsgDiv = false;
            this.editerrormsgDiv = true;
          }
        });
    }
  }
  deleteUser(networkLoginId) {
    this.userRolesService.delete(this.userId, networkLoginId, this.userRoleFormVal['pageNumber'], this.userRoleFormVal['totalPageCount'], this.userRoleFormVal['pageSize']).subscribe(
      (res) => {
        this.userRoleFormVal = res;
        if (this.userRoleFormVal['message'] != null) {
          this.deletedSuccessMsgDiv = true;
          this.deleteUserDiv = false;
          this.deleteErrorMsgDiv = false;
          this.searchBarDiv = true;
          this.searchResultContainerDiv = true;
          this.searchResultsDiv = true;
          this.showSearchResultsDiv = true;
          this.searchShowResultsDiv = true;
          this.showUserSearchView = true;
          this.errorMessageDiv = false;
          this.errorMessageforSearchDiv = false;
        } else if (this.userRoleFormVal['errorMessage'] != null) {
          this.deletedSuccessMsgDiv = false;
          this.deleteErrorMsgDiv = true;
        }
      });
  }
  userRoles() {
    this.userRolesService.userRoles().subscribe(
      (res) => {
        this.userRolesVal = res;
        this.userRoleListVal = this.userRolesVal['roles'].map(function (x) { return { id: x[0], name: x[1] }; });
        console.log(this.userRoleListVal);
      });
  }
  lastCall() {
    this.userRolesService.lastCall(this.setPostData('lastCall')).subscribe(
      (res) => {
        this.userRoleFormVal = res;
        this.pagination();
      });
  }
  previousCall() {
    this.userRolesService.previousCall(this.setPostData('previousCall')).subscribe(
      (res) => {
        this.userRoleFormVal = res;
        this.pagination();
      });
  }
  nextCall() {
    this.userRolesService.nextCall(this.setPostData('nextCall')).subscribe(
      (res) => {
        this.userRoleFormVal = res;
        this.pagination();
      });
  }
  firstCall() {
    this.userRolesService.firstCall(this.setPostData('firstCall')).subscribe(
      (res) => {
        this.userRoleFormVal = res;
        this.pagination();
      });
  }
  toggleUserInstitutionValidation() {
    if (this.institutionId == null || this.institutionId == undefined) {
      this.institutionIdErrMsgDiv = true;
    }
  }
  pagination() {
    if (this.userRoleFormVal['pageNumber'] == 0 && (this.userRoleFormVal['totalPageCount'] - 1 > 0)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = false;
      this.lastbutton = false;
    } else if (this.userRoleFormVal['pageNumber'] == 0 && (this.userRoleFormVal['pageNumber'] == this.userRoleFormVal['totalPageCount'] - 1)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = true;
      this.lastbutton = true;
    }
    else if ((this.userRoleFormVal['pageNumber'] == this.userRoleFormVal['totalPageCount'] - 1) && this.userRoleFormVal['totalPageCount'] - 1 > 0) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = true;
      this.lastbutton = true;
    } else if ((this.userRoleFormVal['pageNumber'] < this.userRoleFormVal['totalPageCount'] - 1) && (this.userRoleFormVal['pageNumber'] != 0)) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = false;
      this.lastbutton = false;
    } else if (this.userRoleFormVal['pageNumber'] == 0 && this.userRoleFormVal['totalPageCount'] == 0) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = true;
      this.lastbutton = true;
    }
  }
  setPostData(actionName) {
    if (actionName == 'createUser') {
      this.resetFields();
    } else if (actionName == 'searchUsers') {
      this.numOfRecordsId = 10;
      this.pageNumber = 0;
      this.validateInput();
    } else if (actionName == 'firstCall') {
      this.validateInput();
      this.pageNumber = 0;
    } else if (actionName == 'lastCall') {
      this.validateInput();
      this.pageNumber = this.userRoleFormVal['totalPageCount'];
      console.log("pageNumber", this.pageNumber);
    } else if (actionName == 'previousCall') {
      this.validateInput();
      this.pageNumber = this.userRoleFormVal['pageNumber'];
    } else if (actionName == 'nextCall') {
      this.validateInput();
      this.pageNumber = this.userRoleFormVal['pageNumber'];
    } else if (actionName == 'pageSize') {
      this.validateInput();
    }

    this.postData = {
      "userId": null,
      "institutionId": this.institutionId,
      "editUserId": 0,
      "roleId": null,
      "editRoleId": null,

      "pageNumber": this.pageNumber,
      "pageSize": this.numOfRecordsId,
      "totalPageCount": 0,
      "editInstitutionId": null,
      "afterDelPageNumber": 0,
      "afterDelPageSize": 10,
      "afterDelTotalPageCount": 0,

      "searchNetworkId": this.searchNetworkId,
      "networkLoginId": this.networkLoginId,
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
      "userDescription": this.userDescription,
      "editNetworkLoginId": null,
      "editUserDescription": null,
      "userEmailId": this.userEmailId,
      "emailId": this.emailId,
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
      "selectedForCreate": this.selectedForCreate,
      "editSelectedForCreate": [],
      "userRoleFormList": [],

      "showEditDeleteIcon": true,

      "createdBy": null,
      "lastUpdatedBy": null
    }
    return this.postData;
  }
  resetFields() {
    this.searchNetworkId = "";
    this.userEmailId = "";
  }
  validateInput() {
    if (this.userEmailId == null && this.searchNetworkId == null) {
      this.userEmailId = "";
      this.searchNetworkId = "";
    } else if (this.userEmailId == null) {
      this.userEmailId = "";
    } else if (this.searchNetworkId == null) {
      this.searchNetworkId = "";
    }
  }
}

