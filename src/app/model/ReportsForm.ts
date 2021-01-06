import { DeaccessionItemResultsRow } from '../model/DeaccessionItemResultsRow';
import { IncompleteReportResultsRow } from '../model/IncompleteReportResultsRow';

export class ReportsForm {
    showBy: string;
    requestType: string;
    requestFromDate: string;
    requestToDate: string;
    accessionDeaccessionFromDate: string;
    accessionDeaccessionToDate: string;

    retrievalRequestPulCount: number;
    retrievalRequestCulCount: number;
    retrievalRequestNyplCount: number;

    recallRequestPulCount: number;
    recallRequestCulCount: number;
    recallRequestNyplCount: number;

    physicalPrivatePulCount: number;
    physicalPrivateCulCount: number;
    physicalPrivateNyplCount: number;

    physicalSharedPulCount: number;
    physicalSharedCulCount: number;
    physicalSharedNyplCount: number;

    eddPrivatePulCount: number;
    eddPrivateCulCount: number;
    eddPrivateNyplCount: number;

    eddSharedOpenPulCount: number;
    eddSharedOpenCulCount: number;
    eddSharedOpenNyplCount: number;

    accessionPrivatePulCount: number;
    accessionPrivateCulCount: number;
    accessionPrivateNyplCount: number;
    accessionSharedPulCount: number;
    accessionSharedCulCount: number;
    accessionSharedNyplCount: number;
    accessionOpenPulCount: number;
    accessionOpenCulCount: number;
    accessionOpenNyplCount: number;

    deaccessionPrivatePulCount: number;
    deaccessionPrivateCulCount: number;
    deaccessionPrivateNyplCount: number;
    deaccessionSharedPulCount: number;
    deaccessionSharedCulCount: number;
    deaccessionSharedNyplCount: number;
    deaccessionOpenPulCount: number;
    deaccessionOpenCulCount: number;
    deaccessionOpenNyplCount: number;

    openPulCgdCount: number;
    openCulCgdCount: number;
    openNyplCgdCount: number;
    sharedPulCgdCount: number;
    sharedCulCgdCount: number;
    sharedNyplCgdCount: number;
    privatePulCgdCount: number;
    privateCulCgdCount: number;
    privateNyplCgdCount: number;

    showILBDResults: boolean;
    showPartners: boolean;
    showRequestTypeTable: boolean;
    showAccessionDeaccessionTable: boolean;
    showReportResultsText: boolean;
    showNotePartners: boolean;
    showNoteRequestType: boolean;

    showRetrievalTable: boolean;
    showRecallTable: boolean;
    showRequestTypeShow: boolean;

    reportRequestType: string[];
    owningInstitutions: string[];
    //collectionGroupDesignations: string[];
    deaccessionItemResultsRows: DeaccessionItemResultsRow[];

    showDeaccessionInformationTable: boolean;

    totalRecordsCount: string;
    pageNumber: number;
    pageSize: number;
    totalPageCount: number;
    deaccessionOwnInst: string;
    incompleteRequestingInstitution: string;
    incompletePageNumber: number;
    incompletePageSize: number;
    incompleteTotalRecordsCount: string;
    incompleteTotalPageCount: number;
    incompleteReportResultsRows: IncompleteReportResultsRow[];
    incompleteShowByInst: string[];
    showIncompleteResults: boolean;
    errorMessage: string;
    showIncompletePagination: boolean;
    export: boolean;
    physicalPartnerSharedPulCount: number;
    physicalPartnerSharedCulCount: number;
    physicalPartnerSharedNyplCount: number;
    eddPartnerSharedOpenPulCount: number;
    eddPartnerSharedOpenCulCount: number;
    eddPartnerSharedOpenNyplCount: number;
    eddRequestPulCount: number;
    eddRequestCulCount: number;
    eddRequestNyplCount: number;
}

