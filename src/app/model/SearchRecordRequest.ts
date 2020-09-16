import { SearchResultRow } from '../model/SearchResultRow';

export class SearchRecordRequest {
    fieldValue: string;
    fieldName: string;
    owningInstitutions: string[];
    collectionGroupDesignations: string[];
    availability: string[];
    materialTypes: string[];
    useRestrictions: string[];
    searchResultRows: SearchResultRow[];
    totalPageCount: number;
    totalBibRecordsCount: string;
    totalItemRecordsCount: string;
    totalRecordsCount: string;
    pageNumber: number;
    pageSize: number;
    showResults: boolean;
    selectAll: boolean;
    selectAllFacets: boolean;
    showTotalCount: boolean;
    index: number;
    errorMessage: string;
    isDeleted: boolean;
    catalogingStatus: string;
}