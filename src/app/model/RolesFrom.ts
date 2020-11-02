import { RolesSearchResult } from '../model/RolesSearchResult';
export class RolesForm {
    roleName: string;
    roleDescription: string;
    permissionNames: string;
    showResults: boolean;
    newRole: boolean;
    totalRecordCount: string;
    errorMessage: string;
    pageNumber: number;
    pageSize: number;
    totalPageCount: number;
    afterDelPageNumber: number;
    afterDelPageSize: number;
    afterDelTotalPageCount: number;
    message: string;
    newRoleName: string;
    newRoleDescription: string;
    newPermissionNames: string
    editRoleName: string;
    editRoleDescription: string;
    editPermissionNames: string;
    editPermissionName: string[];
    roleNameForDelete: string;
    roleDescriptionForDelete: string;
    permissionNamesForDelete: string;
    permissionNameList: string[];
    selectedPermissionNames: string[];
    roleId: number;
    rolesSearchResults: RolesSearchResult[];
    showIntial: boolean
}