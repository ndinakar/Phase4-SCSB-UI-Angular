
import { SearchItemResultRow } from '../model/SearchItemResultRow';

export class SearchResultRow {
    bibId: number;
    title: string;
    author: string;
    publisher: string;
    publisherDate: string;
    owningInstitution: string;
    customerCode: string;
    collectionGroupDesignation: string;
    useRestriction: string;
    barcode: string;
    summaryHoldings: string;
    availability: string;
    leaderMaterialType: string;
    selected: boolean;
    showItems: boolean;
    selectAllItems: boolean;
    searchItemResultRows: SearchItemResultRow[];
    itemId: number;
    showAllItems: boolean;
    owningInstitutionBibId: string;
    owningInstitutionHoldingsId: string;
    owningInstitutionItemId: string;
    requestPosition: string;
    requestId: number;
    patronBarcode: string;
    requestingInstitution: string;
    deliveryLocation: string;
    requestType: string;
    requestNotes: string;
    requestCreatedBy: string;
    patronEmailId: string;
    status: string;
    createdDate: Date = new Date();
    lastUpdatedDate: Date = new Date();

}