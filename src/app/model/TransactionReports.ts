
import { TransactionReportForm } from '@model/TransactionReportForm';
export class TransactionReports {
    totalRecordsCount: string;
    pageNumber: number
    pageSize: number;
    totalPageCount: number;
    message: string
    transactionReportList: TransactionReportForm[];
    owningInsts: string;
    requestingInsts: string;
    typeOfUses: string;
    fromDate: string;
    toDate: string;
    trasactionCallType: string;
    cgdType: string;
}