export class UserRoleForm{
    userId: number;
    institutionId: number;
    editUserId: number;
    roleId: number[];
    editRoleId: number[];

    pageNumber: number;
    pageSize: number;
    totalPageCount: number;
    editInstitutionId: number;
    afterDelPageNumber: number;
    afterDelPageSize: number;
    afterDelTotalPageCount: number;

    searchNetworkId: string;
    networkLoginId: string;
    roleName: string;
    totalRecordsCount: string;
    institutionName: string;
    message: string;
    errorMessage: string;
    errorMessageForEmail: string;
    editErromessage: string;
    sectionName: string;
    buttonName: string;
    editNetworkId: string;
    userDescriptionErrMsg: string;
    userDescription: string;
    editNetworkLoginId: string;
    editUserDescription: string;
    userEmailId: string;
    emailId: string;
    editEmailId: string;

    allowCreateEdit: boolean;
    isCreatedRequest: boolean;
    showPagination: boolean;
    showSearch: boolean;
    showErrorMessage: boolean;
    showCreateSuccess: boolean;
    showCreateError: boolean;
    showEditSuccess: boolean;
    showEditError: boolean;
    showCreateEmailError: boolean;
    deleteSuccessMsg: boolean;
    selected: boolean;
    submitted: boolean;
    showResults: boolean;
    deletedSuccessMsg: boolean;
    deleteErrorMsg: boolean;
    showUserSearchView: boolean;

    roles: object[];
    institutions: object[];
    showSelectedForCreate: number[];
    selectedForCreate: number[];
    editSelectedForCreate: number[];

    showEditDeleteIcon: boolean;

    createdBy: string;
    lastUpdatedBy: string;
}