import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { NgxSpinnerService } from "ngx-spinner";
import { TreeNode } from 'primeng/api';
import { DashBoardService } from '@service/dashBoard/dash-board.service';
import { ReportsService } from '@service/reports/reports.service';
declare var $: any;
var moment = require('moment-timezone');

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportsService: ReportsService, private spinner: NgxSpinnerService, private dashBoardService: DashBoardService) { }

  ngOnInit(): void {
    this.dashBoardService.validate('reports');
    this.spinner.hide();
    this.ReportShowBy = 'Partners';
    this.getInstitutions();
  }

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Export Exceptions Reports',
    useBom: true,
    noDownload: false,
    headers: ["Patron Barcod", "RI", "Item Barcode", "Item OI", "DL", "RT", "Request Created By", "Patron Email Address", "Created Date", "Last Updated Date", "Request Notes"]
  };
  csvOptionsTransaction = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Export Transaction Reports',
    useBom: true,
    noDownload: false,
    headers: ["Requesting Institution", "Owning Institution", "RT/Type of Use", "Item Barcode", "Date and Time of Request", "CGD Status", "Current Status"]
  };
  cgdErrorMessageId: string;
  accessionErrorMessageId: string;
  accessionErrorMessageDiv = false;
  accessionPageResponseResultsDiv = false;
  cgdErrorMessageDiv = false;
  cgdPageResultsDiv = false;
  exportRecorsButtonDiv = false;
  cgdSum: any = [];
  subtotalPhysicalCUL: number;
  subtotalPhysicalPUL: number;
  subtotalPhysicalNYPL: number;
  subtotalEDDCUL: number;
  subtotalEDDPUL: number;
  subtotalEDDNYPL: number;
  totalCUL: number;
  totalPUL: number;
  totalNYPL: number;
  totalCULRequest: number;
  totalPULRequest: number;
  totalNYPLRequest: number;
  subtotalEDDDeaccession: any = [];
  firstbutton = true;
  previousbutton = true;
  nextbutton = false;
  lastbutton = false;
  statusRequest = false;
  partnersResults = false;
  requestTypeResults = false;
  incompleteShowBy: string;
  ReportShowBy: string;
  RequestDateRangefrom: string;
  RequestDateRangeto: string;
  AccessionDeaccessionDateRangefrom: string;
  AccessionDeaccessionDateRangeto: string;
  requestFromDateErrorText = false;
  requestToDateErrorText = false;
  showByErrorText = false;
  requestFromToError = false;
  accessionErrorText = false;
  deaccessionErrorText = false;
  accessionFromToError = false;
  incompleteErrorText = false;
  requestPage = false;
  accesionPage = false;
  cgdPage = false;
  incompletePage = false;
  requestResultsPage = false;
  accessionPageResponse = false;
  incompleteResultsPage = false;
  Deaccessiontableshow = false;
  reportType_panel = true;
  reportstVal: TreeNode[];
  instVal: TreeNode[];
  deaccessionRes: TreeNode[];
  download_response: TreeNode[];
  errorMessageId = false;
  incompleteResultsDiv = false;
  incompletetotalPaginationDiv = false;
  showentries = 10;
  deaccessionOwnInst: string;
  dateAccessionFrom: string;
  dateAccessionTo: string;
  dateFrom: string;
  dateTo: string;
  dateFromException: string;
  dateToException: string;
  dFromDate: string;
  dToDate: string;
  start: any;
  end: any;
  isChecked = false;
  fileName: string;
  dataDecode: string;
  file: File = null;
  pageNumber: number;
  pageSize: number;
  totalPageCount: number
  incompletePageNumber: number;
  incompletePageSize = 10;
  incompleteTotalPageCount: 0;
  incompleteTotalRecordsCount: string;
  showBy: string;
  requestType: string;
  //request Exception
  messageNoSearchRecords = false;
  searchReqExceptionresult = false;
  requestExceptionFromToError = false;
  requestExceptionFromDateErrorText = false;
  requestExceptionToDateErrorText = false;
  RequestExceptionDateRangeto: string;
  RequestExceptionDateRangefrom: string;
  requestExceptionReportDiv = false;
  searchreqExceptionResultVal: TreeNode[];
  searchreqExceptionResultValExport: TreeNode[];
  ExceptionReportsResultsDiv = false;

  firstbuttonException = false;
  previousbuttonException = false;
  nextbuttonException = false;
  lastbuttonException = false;

  itemList: any = [];
  //Transaction Report
  TransactionReportRadio: string;
  transactionReportDiv = false;
  transactionReportResultsDiv = false;
  typeOptions: any;
  owningInstitutionList: any;
  borrowingInstitutionList: any;
  instList_transactons: any;
  instList_transactons_with_id: any;
  Transactiontableshow = false;
  isTransactionChecked = false;
  borrowingErrorText = false;
  owningErrorText = false;
  useErrorText = false;
  transactionDateRangefrom: string;
  transactionDateRangeto: string;
  transactionDateRangefromDateErrorText = false;
  transactionToDateErrorText = false;
  transactionFromToError = false;
  transactionReportVal: TreeNode[];
  transactionReportRecords: TreeNode[];
  transactionReportRecordsExport: TreeNode[];
  dateFromTransaction: string;
  dateToTransaction: string;
  messageNoSearchRecordsTransaction = false;
  transactionReportResultsIfRecordsDiv = false;

  firstbuttonTransaction = false;
  previousbuttonTransaction = false;
  nextbuttonTransaction = false;
  lastbuttonTransaction = false;
  requestInstCodesList: string[];
  owningnInstCodesList: string[];
  cgdTypeList: string[];
  totalCount: any;
  showentriesTransaction: number = 10;
  itemListTransaction: any = [];

  TYPE_LIST_USE = [
    'Retrieval',
    'EDD',
    'Recall'
  ];

  postData = {
    "showBy": null,
    "requestType": null,
    "requestFromDate": null,
    "requestToDate": null,
    "accessionDeaccessionFromDate": null,
    "accessionDeaccessionToDate": null,

    "retrievalRequestPulCount": null,
    "retrievalRequestCulCount": null,
    "retrievalRequestNyplCount": null,

    "recallRequestPulCount": null,
    "recallRequestCulCount": null,
    "recallRequestNyplCount": null,

    "physicalPrivatePulCount": null,
    "physicalPrivateCulCount": null,
    "physicalPrivateNyplCount": null,

    "physicalSharedPulCount": null,
    "physicalSharedCulCount": null,
    "physicalSharedNyplCount": null,

    "eddPrivatePulCount": null,
    "eddPrivateCulCount": null,
    "eddPrivateNyplCount": null,

    "eddSharedOpenPulCount": null,
    "eddSharedOpenCulCount": null,
    "eddSharedOpenNyplCount": null,

    "accessionPrivatePulCount": null,
    "accessionPrivateCulCount": null,
    "accessionPrivateNyplCount": null,
    "accessionSharedPulCount": null,
    "accessionSharedCulCount": null,
    "accessionSharedNyplCount": null,
    "accessionOpenPulCount": null,
    "accessionOpenCulCount": null,
    "accessionOpenNyplCount": null,

    "deaccessionPrivatePulCount": null,
    "deaccessionPrivateCulCount": null,
    "deaccessionPrivateNyplCount": null,
    "deaccessionSharedPulCount": null,
    "deaccessionSharedCulCount": null,
    "deaccessionSharedNyplCount": null,
    "deaccessionOpenPulCount": null,
    "deaccessionOpenCulCount": null,
    "deaccessionOpenNyplCount": null,

    "openPulCgdCount": null,
    "openCulCgdCount": null,
    "openNyplCgdCount": null,
    "sharedPulCgdCount": null,
    "sharedCulCgdCount": null,
    "sharedNyplCgdCount": null,
    "privatePulCgdCount": null,
    "privateCulCgdCount": null,
    "privateNyplCgdCount": null,

    "showILBDResults": false,
    "showPartners": false,
    "showRequestTypeTable": false,
    "showAccessionDeaccessionTable": false,
    "showReportResultsText": false,
    "showNoteILBD": false,
    "showNotePartners": false,
    "showNoteRequestType": false,

    "showRetrievalTable": false,
    "showRecallTable": false,
    "showRequestTypeShow": false,

    "reportRequestType": [],
    "owningInstitutions": [],
    //"collectionGroupDesignations": [],
    "deaccessionItemResultsRows": [],

    "showDeaccessionInformationTable": false,

    "totalRecordsCount": "0",
    "pageNumber": 0,
    "pageSize": 10,
    "totalPageCount": 0,
    "deaccessionOwnInst": null,
    "incompleteRequestingInstitution": null,
    "incompletePageNumber": 0,
    "incompletePageSize": 10,
    "incompleteTotalRecordsCount": "0",
    "incompleteTotalPageCount": 0,
    "incompleteReportResultsRows": [],
    "incompleteShowByInst": [],
    "showIncompleteResults": false,
    "errorMessage": null,
    "showIncompletePagination": false,
    "export": false,

    "physicalPartnerSharedPulCount": null,
    "physicalPartnerSharedCulCount": null,
    "physicalPartnerSharedNyplCount": null,
    "eddPartnerSharedOpenPulCount": null,
    "eddPartnerSharedOpenCulCount": null,
    "eddPartnerSharedOpenNyplCount": null,
    "eddRequestPulCount": null,
    "eddRequestCulCount": null,
    "eddRequestNyplCount": null
  }
  postDataTransaction = {
    "totalRecordsCount": "0",
    "pageNumber": 0,
    "pageSize": 10,
    "totalPageCount": 0,
    "message": null,
    "transactionReportList": null,
    "owningInsts": null,
    "requestingInsts": null,
    "typeOfUses": null,
    "fromDate": null,
    "toDate": null,
    "trasactionCallType": null,
    "cgdType": null
  }
  transactionReprtCount() {
    if (!this.validateTransactionDateRange()) {
      this.postDataTransaction = {
        "totalRecordsCount": "0",
        "pageNumber": 0,
        "pageSize": 10,
        "totalPageCount": 0,
        "message": null,
        "transactionReportList": null,
        "owningInsts": this.owningInstitutionList,
        "requestingInsts": this.borrowingInstitutionList,
        "typeOfUses": this.typeOptions,
        "fromDate": this.dateFromTransaction,
        "toDate": this.dateToTransaction,
        "trasactionCallType": 'COUNT',
        "cgdType": null
      }
      this.reportsService.getTransactionReportCount(this.postDataTransaction).subscribe(
        (res) => {
          this.spinner.hide();
          this.transactionReportVal = res;
          if (this.transactionReportVal['message']) {
            this.transactionReportResultsDiv = true;
            this.messageNoSearchRecordsTransaction = true;
            this.transactionReportResultsIfRecordsDiv = false;
          } else {
            this.transactionReportResultsIfRecordsDiv = true;
            this.messageNoSearchRecordsTransaction = false;
            this.transactionReportResultsDiv = true;
          }
        },
        (error) => {
          this.spinner.hide();
        });
    } else {
      this.transactionReportResultsDiv = false;
    }
  }
  transactionReport(requestInstCodesList, owningnInstCodesList, cgdTypeList, totalCount) {
    if (!this.validateTransactionDateRange()) {
      this.postDataTransaction = {
        "totalRecordsCount": totalCount,
        "pageNumber": 0,
        "pageSize": this.showentriesTransaction,
        "totalPageCount": 0,
        "message": null,
        "transactionReportList": null,
        "owningInsts": requestInstCodesList,
        "requestingInsts": owningnInstCodesList,
        "typeOfUses": this.typeOptions,
        "fromDate": this.dateFromTransaction,
        "toDate": this.dateToTransaction,
        "trasactionCallType": 'REPORTS',
        "cgdType": cgdTypeList
      }
      this.reportsService.getTransactionReport(this.postDataTransaction).subscribe(
        (res) => {
          this.spinner.hide();
          this.transactionReportRecords = res;
          if (this.transactionReportRecords['message']) {
            this.transactionPage();
          } else {
            this.spinner.hide();
            this.paginationTransactionReport();
            this.reportType_panel = false;
            this.isTransactionChecked = false;
            this.transactionReportDiv = false;
            this.transactionReportResultsDiv = false;
            this.messageNoSearchRecordsTransaction = false;
            this.transactionReportResultsIfRecordsDiv = false;
            this.Transactiontableshow = true;
          }
        },
        (error) => {
          this.spinner.hide();
        });
    } else {
      this.transactionReportResultsDiv = false;
    }
  }
  transactionReportExport(requestInstCodesList, owningnInstCodesList, cgdTypeList, totalCount) {
    if (!this.validateTransactionDateRange()) {
      this.postDataTransaction = {
        "totalRecordsCount": totalCount,
        "pageNumber": 0,
        "pageSize": this.showentriesTransaction,
        "totalPageCount": 0,
        "message": null,
        "transactionReportList": null,
        "owningInsts": requestInstCodesList,
        "requestingInsts": owningnInstCodesList,
        "typeOfUses": this.typeOptions,
        "fromDate": this.dateFromTransaction,
        "toDate": this.dateToTransaction,
        "trasactionCallType": 'EXPORT',
        "cgdType": cgdTypeList
      }
      this.reportsService.getTransactionReport(this.postDataTransaction).subscribe(
        (res) => {
          this.spinner.hide();
          this.transactionReportRecordsExport = res;
          var fileNmae = 'ExportTransactionRecords' + '_' +
            new DatePipe('en-US').transform(Date.now(), 'yyyyMMddhhmmss', 'America/New_York');
          new AngularCsv(this.removePropertiesTrnsaction(this.transactionReportRecordsExport['transactionReportList']), fileNmae, this.csvOptionsTransaction);
        },
        (error) => {
          this.spinner.hide();
        });
    } else {
      this.transactionReportResultsDiv = false;
    }
  }
  validateTransactionDateRange() {
    this.statusRequest = false;
    if (this.borrowingInstitutionList == '' || this.borrowingInstitutionList == undefined) {
      this.borrowingErrorText = true;
      this.statusRequest = true;
    } else {
      this.borrowingErrorText = false;
    }
    if (this.owningInstitutionList == '' || this.owningInstitutionList == undefined) {
      this.owningErrorText = true;
      this.statusRequest = true;
    } else {
      this.owningErrorText = false;
    }
    if (this.typeOptions == '' || this.typeOptions == undefined) {
      this.useErrorText = true;
      this.statusRequest = true;
    } else {
      this.useErrorText = false;
    }
    if (this.transactionDateRangefrom == '' || this.transactionDateRangefrom == undefined) {
      this.transactionDateRangefromDateErrorText = true;
      this.statusRequest = true;
    } else {
      this.transactionDateRangefromDateErrorText = false;
    }
    if (this.transactionDateRangeto == '' || this.transactionDateRangeto == undefined) {
      this.transactionToDateErrorText = true;
      this.statusRequest = true;
    } else {
      this.transactionToDateErrorText = false;
    }
    this.dateFromTransaction = this.toDate(this.transactionDateRangefrom);
    this.dateToTransaction = this.toDate(this.transactionDateRangeto);
    if (this.compareDate(this.dateFromTransaction, this.dateToTransaction)) {
      this.statusRequest = true;
      this.transactionFromToError = true;
    } else {
      this.transactionFromToError = false;
    }
    return this.statusRequest;
  }
  validateExceptionDateRange() {
    this.statusRequest = false;
    if (this.RequestExceptionDateRangefrom == '' || this.RequestExceptionDateRangefrom == undefined) {
      this.requestExceptionFromDateErrorText = true;
      this.statusRequest = true;
    } else {
      this.requestExceptionFromDateErrorText = false;
    }
    if (this.RequestExceptionDateRangeto == '' || this.RequestExceptionDateRangeto == undefined) {
      this.requestExceptionToDateErrorText = true;
      this.statusRequest = true;
    } else {
      this.requestExceptionToDateErrorText = false;
    }
    this.dateFromException = this.toDate(this.RequestExceptionDateRangefrom);
    this.dateToException = this.toDate(this.RequestExceptionDateRangeto);
    if (this.compareDate(this.dateFromException, this.dateToException)) {
      this.statusRequest = true;
      this.requestExceptionFromToError = true;
    } else {
      this.requestExceptionFromToError = false;
    }
    return this.statusRequest;
  }

  submitRequestException() {
    if (!this.validateExceptionDateRange()) {
      this.spinner.show();
      this.reportsService.exceptionReports(this.incompleteShowBy, this.dateFromException, this.dateToException).subscribe(
        (res) => {
          this.spinner.hide();
          this.searchreqExceptionResultVal = res;
          this.showentries = 10;
          if (this.searchreqExceptionResultVal['message']) {
            this.searchReqExceptionresult = true;
            this.ExceptionReportsResultsDiv = false;
            this.messageNoSearchRecords = true;
          } else {
            this.searchReqExceptionresult = true;
            this.messageNoSearchRecords = false;
            this.ExceptionReportsResultsDiv = true;
            this.paginationRequestException();
          }
        },
        (error) => {
          this.searchReqExceptionresult = false;
          this.spinner.hide();
        });
    }
  }

  requestExceptionPageSizeChange(pageSize) {
    if (!this.validateExceptionDateRange()) {
      this.spinner.show();
      this.reportsService.pageSizeexceptionReports(this.incompleteShowBy, this.dateFromException, this.dateToException, pageSize).subscribe(
        (res) => {
          this.spinner.hide();
          this.searchreqExceptionResultVal = res;
          if (this.searchreqExceptionResultVal['message']) {
            this.searchReqExceptionresult = true;
            this.ExceptionReportsResultsDiv = false;
            this.messageNoSearchRecords = true;
          } else {
            this.searchReqExceptionresult = true;
            this.messageNoSearchRecords = false;
            this.ExceptionReportsResultsDiv = true;
            this.paginationRequestException();
          }
        },
        (error) => {
          this.searchReqExceptionresult = false;
          this.spinner.hide();
        });
    }
  }
  exportExceptionRecords() {
    this.spinner.show();
    this.reportsService.exportExceptionReports(this.incompleteShowBy, this.dateFromException, this.dateToException).subscribe(
      (res) => {
        this.spinner.hide();
        var fileNmae = 'ExportRecords' + '_' +
          new DatePipe('en-US').transform(Date.now(), 'yyyyMMddhhmmss', 'America/New_York');
        this.searchreqExceptionResultValExport = res;
        new AngularCsv(this.removeProperties(this.searchreqExceptionResultValExport['searchResultRows']), fileNmae, this.csvOptions);
      },
      (error) => {
        this.spinner.hide();
      });
  }
  removeProperties(items) {
    for (var i = 0; i < items.length; i++) {
      var item = {};
      item['patronBarcode'] = items[i].patronBarcode;
      item['requestingInstitution'] = items[i].requestingInstitution;
      item['barcode'] = items[i].barcode;

      item['owningInstitution'] = items[i].owningInstitution;
      item['deliveryLocation'] = items[i].deliveryLocation;
      item['requestType'] = items[i].requestType;

      item['requestCreatedBy'] = items[i].requestCreatedBy;
      item['patronEmailId'] = items[i].patronEmailId;
      item['createdDate'] = this.toTimeZone(items[i].createdDate);
      item['lastUpdatedDate'] = this.toTimeZone(items[i].lastUpdatedDate);

      item['requestNotes'] = items[i].requestNotes;
      this.itemList.push(item);
    }
    return this.itemList;
  }
  removePropertiesTrnsaction(items) {
    for (var i = 0; i < items.length; i++) {
      var item = {};
      item['requestingInst'] = items[i].requestingInst;
      item['owningInst'] = items[i].owningInst;
      item['requestType'] = items[i].requestType;

      item['itemBarcode'] = items[i].itemBarcode;
      item['createdDate'] = this.toTimeZone(items[i].createdDate);
      item['cgd'] = items[i].cgd;
      item['requestStatus'] = items[i].requestStatus;

      this.itemListTransaction.push(item);
    }
    return this.itemListTransaction;
  }
  toTimeZone(time) {
    var format = 'YYYY-MM-DD HH:mm:ss';
    return moment.utc(time).tz("America/New_York").format(format);
  }
  submitRequest() {
    this.dashBoardService.validate('reports');
    this.requestToDateErrorText = false;
    this.showByErrorText = false;
    this.requestFromDateErrorText = false;
    this.statusRequest = false;
    this.requestFromToError = false;
    this.requestResultsPage = false;

    if (this.RequestDateRangeto == '' || this.RequestDateRangeto == undefined) {
      this.requestToDateErrorText = true;
      this.statusRequest = true;
    }
    if (this.ReportShowBy == '' || this.ReportShowBy == undefined) {
      this.showByErrorText = true;
      this.statusRequest = true;
    }
    if (this.RequestDateRangefrom == '' || this.RequestDateRangefrom == undefined) {
      this.requestFromDateErrorText = true;
      this.statusRequest = true;
    }
    this.dateFrom = this.toDate(this.RequestDateRangefrom);
    this.dateTo = this.toDate(this.RequestDateRangeto);
    if (this.compareDate(this.dateFrom, this.dateTo)) {
      this.statusRequest = true;
      this.requestFromToError = true;
    }

    if (!this.statusRequest) {
      this.spinner.show();
      this.requestToDateErrorText = false;
      this.requestFromDateErrorText = false;
      this.postData = {
        "showBy": this.ReportShowBy,
        "requestType": "request",
        "requestFromDate": this.toDate(this.RequestDateRangefrom),
        "requestToDate": this.toDate(this.RequestDateRangeto),
        "accessionDeaccessionFromDate": null,
        "accessionDeaccessionToDate": null,

        "retrievalRequestPulCount": null,
        "retrievalRequestCulCount": null,
        "retrievalRequestNyplCount": null,

        "recallRequestPulCount": null,
        "recallRequestCulCount": null,
        "recallRequestNyplCount": null,

        "physicalPrivatePulCount": null,
        "physicalPrivateCulCount": null,
        "physicalPrivateNyplCount": null,

        "physicalSharedPulCount": null,
        "physicalSharedCulCount": null,
        "physicalSharedNyplCount": null,

        "eddPrivatePulCount": null,
        "eddPrivateCulCount": null,
        "eddPrivateNyplCount": null,

        "eddSharedOpenPulCount": null,
        "eddSharedOpenCulCount": null,
        "eddSharedOpenNyplCount": null,

        "accessionPrivatePulCount": null,
        "accessionPrivateCulCount": null,
        "accessionPrivateNyplCount": null,
        "accessionSharedPulCount": null,
        "accessionSharedCulCount": null,
        "accessionSharedNyplCount": null,
        "accessionOpenPulCount": null,
        "accessionOpenCulCount": null,
        "accessionOpenNyplCount": null,

        "deaccessionPrivatePulCount": null,
        "deaccessionPrivateCulCount": null,
        "deaccessionPrivateNyplCount": null,
        "deaccessionSharedPulCount": null,
        "deaccessionSharedCulCount": null,
        "deaccessionSharedNyplCount": null,
        "deaccessionOpenPulCount": null,
        "deaccessionOpenCulCount": null,
        "deaccessionOpenNyplCount": null,

        "openPulCgdCount": null,
        "openCulCgdCount": null,
        "openNyplCgdCount": null,
        "sharedPulCgdCount": null,
        "sharedCulCgdCount": null,
        "sharedNyplCgdCount": null,
        "privatePulCgdCount": null,
        "privateCulCgdCount": null,
        "privateNyplCgdCount": null,

        "showILBDResults": false,
        "showPartners": false,
        "showRequestTypeTable": false,
        "showAccessionDeaccessionTable": false,
        "showReportResultsText": false,
        "showNoteILBD": false,
        "showNotePartners": false,
        "showNoteRequestType": false,

        "showRetrievalTable": false,
        "showRecallTable": false,
        "showRequestTypeShow": false,

        "reportRequestType": [],
        "owningInstitutions": [],
        //"collectionGroupDesignations": [],
        "deaccessionItemResultsRows": [],

        "showDeaccessionInformationTable": false,

        "totalRecordsCount": "0",
        "pageNumber": 0,
        "pageSize": 10,
        "totalPageCount": 0,
        "deaccessionOwnInst": null,
        "incompleteRequestingInstitution": null,
        "incompletePageNumber": 0,
        "incompletePageSize": 10,
        "incompleteTotalRecordsCount": "0",
        "incompleteTotalPageCount": 0,
        "incompleteReportResultsRows": [],
        "incompleteShowByInst": [],
        "showIncompleteResults": false,
        "errorMessage": null,
        "showIncompletePagination": false,
        "export": false,

        "physicalPartnerSharedPulCount": null,
        "physicalPartnerSharedCulCount": null,
        "physicalPartnerSharedNyplCount": null,
        "eddPartnerSharedOpenPulCount": null,
        "eddPartnerSharedOpenCulCount": null,
        "eddPartnerSharedOpenNyplCount": null,
        "eddRequestPulCount": null,
        "eddRequestCulCount": null,
        "eddRequestNyplCount": null
      }

      this.reportsService.submit(this.postData).subscribe(
        (res) => {
          this.reportstVal = res;
          this.requestResultsPage = true;
          this.accessionPageResponse = false;
          this.incompleteResultsPage = false;
          if (this.reportstVal['showBy'] == "Partners") {
            this.partnersResults = true;
            this.requestTypeResults = false;
          } else {
            this.requestTypeResults = true;
            this.partnersResults = false;
          }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
        }

      );
    }

  }
  toDate(param) {
    if (param) {
      var tempDate = param.split("-");
      var date = tempDate[1] + '/' + tempDate[2] + '/' + tempDate[0];
    }
    return date;
  }
  convertDate(date) {
    var a = new Date(date);
    var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
    return msDateA;
  }
  compareDate(fromD, toD) {
    this.start = this.convertDate(fromD);
    this.end = this.convertDate(toD);
    return (parseFloat(this.start) > parseFloat(this.end));
  }
  submitAccession() {
    this.dashBoardService.validate('reports');
    this.accessionErrorText = false;
    this.deaccessionErrorText = false;
    this.accessionFromToError = false;
    this.accessionPageResponse = false;
    this.statusRequest = false;
    if (this.AccessionDeaccessionDateRangefrom == '' || this.AccessionDeaccessionDateRangefrom == undefined) {
      this.accessionErrorText = true;
      this.statusRequest = true;
    }
    if (this.AccessionDeaccessionDateRangeto == '' || this.AccessionDeaccessionDateRangeto == undefined) {
      this.deaccessionErrorText = true;
      this.statusRequest = true;
    }
    this.dateAccessionFrom = this.toDate(this.AccessionDeaccessionDateRangefrom);
    this.dateAccessionTo = this.toDate(this.AccessionDeaccessionDateRangeto);

    if (this.compareDate(this.dateAccessionFrom, this.dateAccessionTo)) {
      this.accessionFromToError = true;
      this.statusRequest = true;
    }

    if (!this.statusRequest) {
      this.subtotalEDDDeaccession = [];
      this.spinner.show();
      this.postData = {
        "showBy": null,
        "requestType": "Accession/Deaccesion",
        "requestFromDate": null,
        "requestToDate": null,
        "accessionDeaccessionFromDate": this.dateAccessionFrom,
        "accessionDeaccessionToDate": this.dateAccessionTo,

        "retrievalRequestPulCount": null,
        "retrievalRequestCulCount": null,
        "retrievalRequestNyplCount": null,

        "recallRequestPulCount": null,
        "recallRequestCulCount": null,
        "recallRequestNyplCount": null,

        "physicalPrivatePulCount": null,
        "physicalPrivateCulCount": null,
        "physicalPrivateNyplCount": null,

        "physicalSharedPulCount": null,
        "physicalSharedCulCount": null,
        "physicalSharedNyplCount": null,

        "eddPrivatePulCount": null,
        "eddPrivateCulCount": null,
        "eddPrivateNyplCount": null,

        "eddSharedOpenPulCount": null,
        "eddSharedOpenCulCount": null,
        "eddSharedOpenNyplCount": null,

        "accessionPrivatePulCount": null,
        "accessionPrivateCulCount": null,
        "accessionPrivateNyplCount": null,
        "accessionSharedPulCount": null,
        "accessionSharedCulCount": null,
        "accessionSharedNyplCount": null,
        "accessionOpenPulCount": null,
        "accessionOpenCulCount": null,
        "accessionOpenNyplCount": null,

        "deaccessionPrivatePulCount": null,
        "deaccessionPrivateCulCount": null,
        "deaccessionPrivateNyplCount": null,
        "deaccessionSharedPulCount": null,
        "deaccessionSharedCulCount": null,
        "deaccessionSharedNyplCount": null,
        "deaccessionOpenPulCount": null,
        "deaccessionOpenCulCount": null,
        "deaccessionOpenNyplCount": null,

        "openPulCgdCount": null,
        "openCulCgdCount": null,
        "openNyplCgdCount": null,
        "sharedPulCgdCount": null,
        "sharedCulCgdCount": null,
        "sharedNyplCgdCount": null,
        "privatePulCgdCount": null,
        "privateCulCgdCount": null,
        "privateNyplCgdCount": null,

        "showILBDResults": false,
        "showPartners": false,
        "showRequestTypeTable": false,
        "showAccessionDeaccessionTable": false,
        "showReportResultsText": false,
        "showNoteILBD": false,
        "showNotePartners": false,
        "showNoteRequestType": false,

        "showRetrievalTable": false,
        "showRecallTable": false,
        "showRequestTypeShow": false,

        "reportRequestType": [],
        "owningInstitutions": [],
        //"collectionGroupDesignations": [],
        "deaccessionItemResultsRows": [],

        "showDeaccessionInformationTable": false,

        "totalRecordsCount": "0",
        "pageNumber": 0,
        "pageSize": 10,
        "totalPageCount": 0,
        "deaccessionOwnInst": null,
        "incompleteRequestingInstitution": null,
        "incompletePageNumber": 0,
        "incompletePageSize": 10,
        "incompleteTotalRecordsCount": "0",
        "incompleteTotalPageCount": 0,
        "incompleteReportResultsRows": [],
        "incompleteShowByInst": [],
        "showIncompleteResults": false,
        "errorMessage": null,
        "showIncompletePagination": false,
        "export": false,

        "physicalPartnerSharedPulCount": null,
        "physicalPartnerSharedCulCount": null,
        "physicalPartnerSharedNyplCount": null,
        "eddPartnerSharedOpenPulCount": null,
        "eddPartnerSharedOpenCulCount": null,
        "eddPartnerSharedOpenNyplCount": null,
        "eddRequestPulCount": null,
        "eddRequestCulCount": null,
        "eddRequestNyplCount": null
      }
      this.reportsService.submit(this.postData).subscribe(
        (res) => {
          this.spinner.hide();
          this.reportstVal = res;
          if (this.reportstVal['errorMessage'] != null) {
            this.requestResultsPage = false;
            this.accessionPageResponse = true;
            this.incompleteResultsPage = false;
            this.accessionErrorMessageDiv = true;
            this.accessionPageResponseResultsDiv = false;
            this.accesionPage = true;
            this.reportType_panel = true;
            this.Deaccessiontableshow = false;
            this.isChecked = true;
            var totalCountDeacc = 0;
          } else {
            this.requestResultsPage = false;
            this.accessionPageResponse = true;
            this.accessionErrorMessageDiv = false;
            this.accessionPageResponseResultsDiv = true;
            this.incompleteResultsPage = false;
            this.accesionPage = true;
            this.reportType_panel = true;
            this.Deaccessiontableshow = false;
            this.isChecked = true;
            var totalCountDeacc = 0;

            for (var i = 0; i < this.reportstVal['reportsInstitutionFormList'].length; i++) {
              var institutionAccession = this.reportstVal['reportsInstitutionFormList'][i].institution;
              totalCountDeacc = this.reportstVal['reportsInstitutionFormList'][i].deaccessionPrivateCount + this.reportstVal['reportsInstitutionFormList'][i].deaccessionSharedCount + this.reportstVal['reportsInstitutionFormList'][i].deaccessionOpenCount;
              var myMap = { institution: institutionAccession, count: totalCountDeacc };
              this.subtotalEDDDeaccession.push(myMap);
            }
          }
        },
        (error) => {
          this.spinner.hide();
        }

      );
    }
  }
  incompleteRecords() {
    this.dashBoardService.validate('reports');
    this.incompleteResultsPage = false;
    this.incompleteErrorText = false;
    this.statusRequest = false;
    if (this.incompleteShowBy == '' || this.incompleteShowBy == undefined) {
      this.incompleteErrorText = true;
      this.statusRequest = true;
    }
    if (!this.statusRequest) {
      this.spinner.show();
      this.reportsService.incompleteRecords(this.setPostData('incompleteRecords', 'incomplete')).subscribe(
        (res) => {
          this.reportstVal = res;
          this.incompleteResultsPage = true;
          this.incompleteResultsDiv = false;
          this.errorMessageId = false;
          this.incompletetotalPaginationDiv = false;
          this.requestResultsPage = false;
          this.accessionPageResponse = false;
          this.incompletePageSize = this.reportstVal['incompletePageSize'];
          if (this.reportstVal['errorMessage'] != null || this.reportstVal['errorMessage'] != undefined) {
            this.errorMessageId = true;
            this.incompleteResultsDiv = false;
            this.incompletetotalPaginationDiv = false;
            this.exportRecorsButtonDiv = false;
          } else {
            this.errorMessageId = false;
            this.incompleteResultsDiv = true;
            this.incompletetotalPaginationDiv = true;
            this.exportRecorsButtonDiv = true;
          }
          this.pagination('incomplete');
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
        }

      );
    }
  }
  enableRequestExceptionPage() {
    this.spinner.hide();
    this.searchreqExceptionResultVal = null;
    this.resetFields();
    this.requestPage = false;
    this.accesionPage = false;
    this.cgdPage = false;
    this.incompletePage = false;
    this.requestToDateErrorText = false;
    this.showByErrorText = false;
    this.requestFromDateErrorText = false;
    this.requestFromToError = false;
    this.requestResultsPage = false;
    this.searchReqExceptionresult = false;
    this.transactionReportDiv = false;
    this.requestExceptionReportDiv = true;
  }
  enableTransactionReportPage() {
    this.spinner.hide();
    this.searchreqExceptionResultVal = null;
    this.resetFields();
    this.requestPage = false;
    this.accesionPage = false;
    this.cgdPage = false;
    this.incompletePage = false;
    this.requestToDateErrorText = false;
    this.showByErrorText = false;
    this.requestFromDateErrorText = false;
    this.requestFromToError = false;
    this.requestResultsPage = false;
    this.searchReqExceptionresult = false;
    this.requestExceptionReportDiv = false;
    this.transactionReportDiv = true;
  }
  enableRequestPage() {
    this.spinner.hide();
    this.resetFields();
    this.requestPage = true;
    this.accesionPage = false;
    this.cgdPage = false;
    this.incompletePage = false;
    this.requestToDateErrorText = false;
    this.showByErrorText = false;
    this.requestFromDateErrorText = false;
    this.requestFromToError = false;
    this.requestResultsPage = false;
    this.requestExceptionReportDiv = false;
    this.transactionReportDiv = false;
  }
  enableAccessionPage() {
    this.spinner.hide();
    this.resetFields();
    this.requestPage = false;
    this.accesionPage = true;
    this.cgdPage = false;
    this.incompletePage = false;
    this.accessionErrorText = false;
    this.deaccessionErrorText = false;
    this.accessionFromToError = false;
    this.accessionPageResponse = false;
    this.isChecked = true;
    this.requestExceptionReportDiv = false;
    this.transactionReportDiv = false;
  }
  enableCGDPage() {
    this.dashBoardService.validate('reports');
    this.spinner.show();
    this.resetFields();
    this.reportsService.collectionGroupDesignation().subscribe(
      (res) => {
        this.spinner.hide();
        this.reportstVal = res;
        if (this.reportstVal['errorMessage'] != null) {
          this.requestPage = false;
          this.accesionPage = false;
          this.cgdPage = true;
          this.cgdErrorMessageDiv = true;
          this.cgdPageResultsDiv = false;
          this.incompletePage = false;
          this.requestExceptionReportDiv = false;
        } else {
          this.requestPage = false;
          this.accesionPage = false;
          this.cgdPage = true;
          this.cgdPageResultsDiv = true;
          this.cgdErrorMessageDiv = false;
          this.incompletePage = false;
          this.requestExceptionReportDiv = false;
        }
      },
      (error) => {
        this.spinner.hide();
      });
  }
  enableincompletePage() {
    this.spinner.hide();
    this.requestExceptionReportDiv = false;
    this.requestPage = false;
    this.accesionPage = false;
    this.cgdPage = false;
    this.incompletePage = true;
    this.resetFields();
    this.getInstitutions();
  }
  incompleteReportPageSizeChange(value) {
    this.incompletePageSize = value;
    this.reportsService.incompleteReportPageSizeChange(this.setPostData('pageSize', 'incomplete')).subscribe(
      (res) => {
        this.reportstVal = res;
        this.pagination('incomplete');
      },
      (error) => {

      }
    );
  }

  deaccessionInformationOnChange(value) {
    this.pageSize = value;
    this.reportsService.incompleteReportPageSizeChange(this.setPostData('pageSize', 'deaccession')).subscribe(
      (res) => {
        this.deaccessionRes = res;
        this.pagination('deaccession');
      },
      (error) => {

      }
    );
  }
  deaccessionInformation() {
    this.spinner.show();
    this.reportsService.deaccessionInformation(this.setPostData('deaccessionInfo', 'deaccession')).subscribe(
      (res) => {
        this.spinner.hide();
        this.deaccessionRes = res;
        this.showentries = this.deaccessionRes['incompletePageSize'];
        this.accessionPageResponse = false;
        this.accesionPage = false;
        this.reportType_panel = false;
        this.Deaccessiontableshow = true;
        this.pagination('deaccession');

      },
      (error) => {
        this.spinner.hide();
      }

    );
  }
  deaccessionfirstCall() {
    this.reportsService.firstCall(this.setPostData('firstCall', 'deaccession')).subscribe(
      (res) => {
        this.deaccessionRes = res;
        this.pagination('deaccession');
      },
      (error) => {

      }

    );
  }
  deaccessionlastCall() {
    this.reportsService.lastCall(this.setPostData('lastCall', 'deaccession')).subscribe(
      (res) => {
        this.deaccessionRes = res;
        this.pagination('deaccession');
      },
      (error) => {

      }
    );
  }
  deaccessionnextCall() {
    this.reportsService.nextCall(this.setPostData('nextCall', 'deaccession')).subscribe(
      (res) => {
        this.deaccessionRes = res;
        this.pagination('deaccession');
      },
      (error) => {

      }
    );
  }
  deaccessionpreviousCall() {
    this.reportsService.previousCall(this.setPostData('previousCall', 'deaccession')).subscribe(
      (res) => {
        this.deaccessionRes = res;
        this.pagination('deaccession');
      },
      (error) => {

      }
    );
  }

  firstCall() {
    this.spinner.show();
    this.incompleteResultsPage = false;
    this.reportsService.firstCall(this.setPostData('firstCall', 'incomplete')).subscribe(
      (res) => {
        this.reportstVal = res;
        this.incompleteResultsPage = true;
        this.spinner.hide();
        this.pagination('incomplete');
      },
      (error) => {

      }

    );
  }
  nextCall() {
    this.spinner.show();
    this.incompleteResultsPage = false;
    this.reportsService.nextCall(this.setPostData('nextCall', 'incomplete')).subscribe(
      (res) => {
        this.reportstVal = res;
        this.incompleteResultsPage = true;
        this.spinner.hide();
        this.pagination('incomplete');
      },
      (error) => {

      }
    );
  }
  previousCall() {
    this.spinner.show();
    this.incompleteResultsPage = false;
    this.reportsService.previousCall(this.setPostData('previousCall', 'incomplete')).subscribe(
      (res) => {
        this.reportstVal = res;
        this.incompleteResultsPage = true;
        this.spinner.hide();
        this.pagination('incomplete');
      },
      (error) => {

      }
    );
  }
  lastCall() {
    this.spinner.show();
    this.incompleteResultsPage = false;
    this.reportsService.lastCall(this.setPostData('lastCall', 'incomplete')).subscribe(
      (res) => {
        this.reportstVal = res;
        this.incompleteResultsPage = true;
        this.spinner.hide();
        this.pagination('incomplete');
      },
      (error) => {

      }
    );
  }
  getInstitutions() {
    this.reportsService.getInstitutions().subscribe(
      (res) => {
        this.instVal = res;
        this.incompleteShowBy = this.instVal['incompleteShowByInst'][0];
        this.instList_transactons = this.instVal['incompleteShowByInst'].map(function (x) { return { name: x }; });
      },
      (error) => { }
    );
  }
  pagination(actionName) {
    if (actionName == 'incomplete') {
      if (this.reportstVal['incompletePageNumber'] == 0 && (this.reportstVal['incompleteTotalPageCount'] - 1 > 0)) {
        this.firstbutton = true;
        this.previousbutton = true;
        this.nextbutton = false;
        this.lastbutton = false;
      } else if (this.reportstVal['incompletePageNumber'] == 0 && (this.reportstVal['pageNumber'] == this.reportstVal['incompleteTotalPageCount'] - 1)) {
        this.firstbutton = true;
        this.previousbutton = true;
        this.nextbutton = true;
        this.lastbutton = true;
      }
      else if ((this.reportstVal['incompletePageNumber'] == this.reportstVal['incompleteTotalPageCount'] - 1) && this.reportstVal['incompleteTotalPageCount'] - 1 > 0) {
        this.firstbutton = false;
        this.previousbutton = false;
        this.nextbutton = true;
        this.lastbutton = true;
      } else if ((this.reportstVal['incompletePageNumber'] < this.reportstVal['incompleteTotalPageCount'] - 1) && (this.reportstVal['incompleteTotalPageCount'] != 0)) {
        this.firstbutton = false;
        this.previousbutton = false;
        this.nextbutton = false;
        this.lastbutton = false;
      } else if (this.reportstVal['incompletePageNumber'] == 0 && this.reportstVal['incompleteTotalPageCount'] == 0) {
        this.firstbutton = true;
        this.previousbutton = true;
        this.nextbutton = true;
        this.lastbutton = true;
      }
    } else {
      if (this.deaccessionRes['pageNumber'] == 0 && (this.deaccessionRes['totalPageCount'] - 1 > 0)) {
        this.firstbutton = true;
        this.previousbutton = true;
        this.nextbutton = false;
        this.lastbutton = false;
      } else if (this.deaccessionRes['pageNumber'] == 0 && (this.deaccessionRes['pageNumber'] == this.deaccessionRes['totalPageCount'] - 1)) {
        this.firstbutton = true;
        this.previousbutton = true;
        this.nextbutton = true;
        this.lastbutton = true;
      }
      else if ((this.deaccessionRes['pageNumber'] == this.deaccessionRes['totalPageCount'] - 1) && this.deaccessionRes['totalPageCount'] - 1 > 0) {
        this.firstbutton = false;
        this.previousbutton = false;
        this.nextbutton = true;
        this.lastbutton = true;
      } else if ((this.deaccessionRes['pageNumber'] < this.deaccessionRes['totalPageCount'] - 1) && (this.deaccessionRes['pageNumber'] != 0)) {
        this.firstbutton = false;
        this.previousbutton = false;
        this.nextbutton = false;
        this.lastbutton = false;
      } else if (this.deaccessionRes['pageNumber'] == 0 && this.deaccessionRes['totalPageCount'] == 0) {
        this.firstbutton = true;
        this.previousbutton = true;
        this.nextbutton = true;
        this.lastbutton = true;
      }
    }
  }
  deaccession(inst) {
    this.deaccessionOwnInst = inst;
    this.deaccessionInformation();
  }
  resetFields() {
    this.AccessionDeaccessionDateRangefrom = '';
    this.AccessionDeaccessionDateRangeto = '';
    this.RequestDateRangefrom = '';
    this.RequestDateRangeto = '';
    this.ReportShowBy = 'Partners';
    this.RequestExceptionDateRangefrom = '';
    this.RequestExceptionDateRangeto = '';
    //requestException
    this.messageNoSearchRecords = false;
    this.searchReqExceptionresult = false;
    this.requestExceptionFromToError = false;
    this.requestExceptionFromDateErrorText = false;
    this.requestExceptionToDateErrorText = false;
    this.RequestExceptionDateRangeto = '';
    this.RequestExceptionDateRangefrom = '';
    this.requestExceptionReportDiv = false;
    this.searchreqExceptionResultVal = null;
    this.searchreqExceptionResultValExport = null;
    this.ExceptionReportsResultsDiv = false;

    this.firstbuttonException = false;
    this.previousbuttonException = false;
    this.nextbuttonException = false;
    this.lastbuttonException = false;

    // transcaction
    this.transactionReportDiv = false;
    this.transactionReportResultsDiv = false;
    this.typeOptions = '';
    this.owningInstitutionList = '';
    this.borrowingInstitutionList = '';
    this.Transactiontableshow = false;
    this.isTransactionChecked = false;
    this.borrowingErrorText = false;
    this.owningErrorText = false;
    this.useErrorText = false;
    this.transactionDateRangefrom = '';
    this.transactionDateRangeto = '';
    this.transactionDateRangefromDateErrorText = false;
    this.transactionToDateErrorText = false;
    this.transactionFromToError = false;
  }
  reportShowBy() {
    this.requestResultsPage = false;
  }
  goBack($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.submitAccession();
  }
  exportRecords() {
    this.reportsService.exportData(this.setPostData('export', 'incomplete')).subscribe(
      (res) => {
        this.download_response = res;
        this.fileName = this.download_response['fileName'];
        var contentType = "application/vnd.ms-excel";
        this.dataDecode = atob(this.download_response['content']);
        var file = new Blob([this.dataDecode], { type: contentType });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(file);
        link.setAttribute('download', this.fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
      });
  }
  setPostData(actionName, actionType) {
    this.showBy = "Partners";
    if (actionType == 'incomplete') {
      this.requestType = "IncompleteRecordsReport";
      this.deaccessionOwnInst = null;
      this.dFromDate = null;
      this.dToDate = null;
      this.onchangeValidationIncomplete(actionName);
    } else {
      this.incompleteShowBy = null;
      this.requestType = "Accession/Deaccesion";
      this.onchangeValidationDeaccession(actionName);
      this.dFromDate = this.toDate(this.AccessionDeaccessionDateRangefrom);
      this.dToDate = this.toDate(this.AccessionDeaccessionDateRangeto);
    }
    this.postData = {
      "showBy": this.showBy,
      "requestType": this.requestType,
      "requestFromDate": null,
      "requestToDate": null,
      "accessionDeaccessionFromDate": this.dFromDate,
      "accessionDeaccessionToDate": this.dToDate,

      "retrievalRequestPulCount": null,
      "retrievalRequestCulCount": null,
      "retrievalRequestNyplCount": null,

      "recallRequestPulCount": null,
      "recallRequestCulCount": null,
      "recallRequestNyplCount": null,

      "physicalPrivatePulCount": null,
      "physicalPrivateCulCount": null,
      "physicalPrivateNyplCount": null,

      "physicalSharedPulCount": null,
      "physicalSharedCulCount": null,
      "physicalSharedNyplCount": null,

      "eddPrivatePulCount": null,
      "eddPrivateCulCount": null,
      "eddPrivateNyplCount": null,

      "eddSharedOpenPulCount": null,
      "eddSharedOpenCulCount": null,
      "eddSharedOpenNyplCount": null,

      "accessionPrivatePulCount": null,
      "accessionPrivateCulCount": null,
      "accessionPrivateNyplCount": null,
      "accessionSharedPulCount": null,
      "accessionSharedCulCount": null,
      "accessionSharedNyplCount": null,
      "accessionOpenPulCount": null,
      "accessionOpenCulCount": null,
      "accessionOpenNyplCount": null,

      "deaccessionPrivatePulCount": null,
      "deaccessionPrivateCulCount": null,
      "deaccessionPrivateNyplCount": null,
      "deaccessionSharedPulCount": null,
      "deaccessionSharedCulCount": null,
      "deaccessionSharedNyplCount": null,
      "deaccessionOpenPulCount": null,
      "deaccessionOpenCulCount": null,
      "deaccessionOpenNyplCount": null,

      "openPulCgdCount": null,
      "openCulCgdCount": null,
      "openNyplCgdCount": null,
      "sharedPulCgdCount": null,
      "sharedCulCgdCount": null,
      "sharedNyplCgdCount": null,
      "privatePulCgdCount": null,
      "privateCulCgdCount": null,
      "privateNyplCgdCount": null,

      "showILBDResults": false,
      "showPartners": false,
      "showRequestTypeTable": false,
      "showAccessionDeaccessionTable": false,
      "showReportResultsText": false,
      "showNoteILBD": false,
      "showNotePartners": false,
      "showNoteRequestType": false,

      "showRetrievalTable": false,
      "showRecallTable": false,
      "showRequestTypeShow": false,

      "reportRequestType": [],
      "owningInstitutions": [],
      //"collectionGroupDesignations": [],
      "deaccessionItemResultsRows": [],

      "showDeaccessionInformationTable": false,

      "totalRecordsCount": "0",
      "pageNumber": this.pageNumber,
      "pageSize": this.pageSize,
      "totalPageCount": this.totalPageCount,
      "deaccessionOwnInst": this.deaccessionOwnInst,
      "incompleteRequestingInstitution": this.incompleteShowBy,
      "incompletePageNumber": this.incompletePageNumber,
      "incompletePageSize": this.incompletePageSize,
      "incompleteTotalRecordsCount": "0",
      "incompleteTotalPageCount": this.incompleteTotalPageCount,
      "incompleteReportResultsRows": [],
      "incompleteShowByInst": [],
      "showIncompleteResults": false,
      "errorMessage": null,
      "showIncompletePagination": false,
      "export": false,

      "physicalPartnerSharedPulCount": null,
      "physicalPartnerSharedCulCount": null,
      "physicalPartnerSharedNyplCount": null,
      "eddPartnerSharedOpenPulCount": null,
      "eddPartnerSharedOpenCulCount": null,
      "eddPartnerSharedOpenNyplCount": null,
      "eddRequestPulCount": null,
      "eddRequestCulCount": null,
      "eddRequestNyplCount": null
    }
    this.reportstVal = null;
    return this.postData;
  }
  onchangeValidationDeaccession(actionName) {
    if (actionName == 'firstCall') {
      this.pageNumber = 0;
      this.pageSize = this.showentries;
    } else if (actionName == 'lastCall') {
      this.pageNumber = this.deaccessionRes['pageNumber'];
      this.pageSize = this.showentries,
        this.totalPageCount = this.deaccessionRes['totalPageCount'];
    } else if (actionName == 'previousCall') {
      this.pageNumber = this.deaccessionRes['pageNumber'];
      this.pageSize = this.showentries,
        this.totalPageCount = this.deaccessionRes['totalPageCount'];
    } else if (actionName == 'nextCall') {
      this.pageNumber = this.deaccessionRes['pageNumber'];
      this.pageSize = this.showentries,
        this.totalPageCount = this.deaccessionRes['totalPageCount'];
    } else if (actionName == 'pageSize') {
      this.pageNumber = this.deaccessionRes['pageNumber'];
      this.totalPageCount = this.deaccessionRes['totalPageCount'];
    } else if (actionName == 'deaccessionInfo') {
      this.pageNumber = 0;
      this.pageSize = 10;
    }
  }
  onchangeValidationIncomplete(actionName) {
    if (actionName == 'firstCall') {
      this.incompletePageNumber = 0;
    } else if (actionName == 'lastCall') {
      this.incompletePageNumber = this.reportstVal['incompletePageNumber'];
      this.incompleteTotalPageCount = this.reportstVal['incompleteTotalPageCount'];
    } else if (actionName == 'previousCall') {
      this.incompletePageNumber = this.reportstVal['incompletePageNumber'];
      this.incompleteTotalPageCount = this.reportstVal['incompleteTotalPageCount'];
    } else if (actionName == 'nextCall') {
      this.incompletePageNumber = this.reportstVal['incompletePageNumber'];
      this.incompleteTotalPageCount = this.reportstVal['incompleteTotalPageCount'];
    } else if (actionName == 'pageSize') {
      this.incompletePageNumber = this.reportstVal['incompletePageNumber'];
      this.incompleteTotalPageCount = this.reportstVal['incompleteTotalPageCount'];
    } else if (actionName == 'incompleteRecords') {
      this.incompletePageNumber = 0;
      this.incompletePageSize = 10;
    } else if (actionName == 'export') {
      this.incompletePageNumber = this.reportstVal['incompletePageNumber'];
      this.incompletePageSize = this.reportstVal['incompletePageSize'];
      this.incompleteTotalPageCount = this.reportstVal['incompleteTotalPageCount'];
      this.incompleteTotalRecordsCount = this.reportstVal['incompleteTotalRecordsCount'];
    }
  }
  firstCallException() {
    if (!this.validateExceptionDateRange()) {
      this.spinner.show();
      this.reportsService.pageSizeexceptionReports(this.incompleteShowBy, this.dateFromException, this.dateToException, this.showentries.toString()).subscribe(
        (res) => {
          this.spinner.hide();
          this.searchreqExceptionResultVal = res;
          if (this.searchreqExceptionResultVal['message']) {
            this.searchReqExceptionresult = true;
            this.ExceptionReportsResultsDiv = false;
            this.messageNoSearchRecords = true;
          } else {
            this.searchReqExceptionresult = true;
            this.messageNoSearchRecords = false;
            this.ExceptionReportsResultsDiv = true;
            this.paginationRequestException();
          }
        },
        (error) => {
          this.searchReqExceptionresult = false;
          this.spinner.hide();
        });
    }
  }
  nextCallException() {
    if (!this.validateExceptionDateRange()) {
      this.spinner.show();
      this.pageNumber = this.searchreqExceptionResultVal['pageNumber'] + 1;
      this.reportsService.nextCallexceptionReports(this.incompleteShowBy, this.dateFromException, this.dateToException, this.pageNumber.toString(), this.showentries.toString()).subscribe(
        (res) => {
          this.spinner.hide();
          this.searchreqExceptionResultVal = res;
          if (this.searchreqExceptionResultVal['message']) {
            this.searchReqExceptionresult = true;
            this.ExceptionReportsResultsDiv = false;
            this.messageNoSearchRecords = true;
          } else {
            this.searchReqExceptionresult = true;
            this.messageNoSearchRecords = false;
            this.ExceptionReportsResultsDiv = true;
            this.paginationRequestException();
          }
        },
        (error) => {
          this.searchReqExceptionresult = false;
          this.spinner.hide();
        });
    }
  }
  previousCallException() {
    if (!this.validateExceptionDateRange()) {
      this.spinner.show();
      this.pageNumber = this.searchreqExceptionResultVal['pageNumber'] - 1;
      this.reportsService.nextCallexceptionReports(this.incompleteShowBy, this.dateFromException, this.dateToException, this.pageNumber.toString(), this.showentries.toString()).subscribe(
        (res) => {
          this.spinner.hide();
          this.searchreqExceptionResultVal = res;
          if (this.searchreqExceptionResultVal['message']) {
            this.searchReqExceptionresult = true;
            this.ExceptionReportsResultsDiv = false;
            this.messageNoSearchRecords = true;
          } else {
            this.searchReqExceptionresult = true;
            this.messageNoSearchRecords = false;
            this.ExceptionReportsResultsDiv = true;
            this.paginationRequestException();
          }
        },
        (error) => {
          this.searchReqExceptionresult = false;
          this.spinner.hide();
        });
    }
  }
  lastCallException() {
    if (!this.validateExceptionDateRange()) {
      this.spinner.show();
      this.pageNumber = this.searchreqExceptionResultVal['totalPageCount'] - 1;
      this.reportsService.nextCallexceptionReports(this.incompleteShowBy, this.dateFromException, this.dateToException, this.pageNumber.toString(), this.showentries.toString()).subscribe(
        (res) => {
          this.spinner.hide();
          this.searchreqExceptionResultVal = res;
          if (this.searchreqExceptionResultVal['message']) {
            this.searchReqExceptionresult = true;
            this.ExceptionReportsResultsDiv = false;
            this.messageNoSearchRecords = true;
          } else {
            this.searchReqExceptionresult = true;
            this.messageNoSearchRecords = false;
            this.ExceptionReportsResultsDiv = true;
            this.paginationRequestException();
          }
        },
        (error) => {
          this.searchReqExceptionresult = false;
          this.spinner.hide();
        });
    }
  }
  paginationRequestException() {
    if (this.searchreqExceptionResultVal['pageNumber'] == 0 && (this.searchreqExceptionResultVal['totalPageCount'] - 1 > 0)) {
      this.firstbuttonException = true;
      this.previousbuttonException = true;
      this.nextbuttonException = false;
      this.lastbuttonException = false;
    } else if (this.searchreqExceptionResultVal['pageNumber'] == 0 && (this.searchreqExceptionResultVal['pageNumber'] == this.searchreqExceptionResultVal['totalPageCount'] - 1)) {
      this.firstbuttonException = true;
      this.previousbuttonException = true;
      this.nextbuttonException = true;
      this.lastbuttonException = true;
    }
    else if ((this.searchreqExceptionResultVal['pageNumber'] == this.searchreqExceptionResultVal['totalPageCount'] - 1) && this.searchreqExceptionResultVal['totalPageCount'] - 1 > 0) {
      this.firstbuttonException = false;
      this.previousbuttonException = false;
      this.nextbuttonException = true;
      this.lastbuttonException = true;
    } else if ((this.searchreqExceptionResultVal['pageNumber'] < this.searchreqExceptionResultVal['totalPageCount'] - 1) && (this.searchreqExceptionResultVal['pageNumber'] != 0)) {
      this.firstbuttonException = false;
      this.previousbuttonException = false;
      this.nextbuttonException = false;
      this.lastbuttonException = false;
    }
  }

  pullReports(reqType, index_req, index_owning, cgdType) {
    this.showentriesTransaction = 10;
    this.pullReportsData(reqType, index_req, index_owning, cgdType)
  }
  pullReportsEDD(reqType, index_req, index_owning) {
    this.showentriesTransaction = 10;
    this.pullReportsData(reqType, index_req, index_owning, '')
  }
  transactionfirstCall() {
    this.transactionReport(this.requestInstCodesList, this.owningnInstCodesList, this.cgdTypeList, this.totalCount);
  }
  transactionpreviousCall() {
    this.paginationPullReports(this.transactionReportRecords['pageNumber'] - 1);
  }
  transactionnextCall() {
    this.paginationPullReports(this.transactionReportRecords['pageNumber'] + 1);
  }
  transactionlastCall() {
    this.paginationPullReports(this.transactionReportRecords['totalPageCount'] - 1);
  }
  transactionReportsOnChange() {
    this.transactionfirstCall();
  }
  transactionReportsExport() {
    this.transactionReportExport(this.requestInstCodesList, this.owningnInstCodesList, this.cgdTypeList, this.totalCount);
  }
  paginationPullReports(pageNumber) {
    if (!this.validateTransactionDateRange()) {
      this.postDataTransaction = {
        "totalRecordsCount": this.totalCount,
        "pageNumber": pageNumber,
        "pageSize": this.showentriesTransaction,
        "totalPageCount": this.transactionReportRecords['toatalPageCount'],
        "message": null,
        "transactionReportList": null,
        "owningInsts": this.requestInstCodesList,
        "requestingInsts": this.owningnInstCodesList,
        "typeOfUses": this.typeOptions,
        "fromDate": this.dateFromTransaction,
        "toDate": this.dateToTransaction,
        "trasactionCallType": 'REPORTS',
        "cgdType": this.cgdTypeList
      }
      this.reportsService.getTransactionReport(this.postDataTransaction).subscribe(
        (res) => {
          this.spinner.hide();
          this.transactionReportRecords = res;
          if (this.transactionReportRecords['message']) {
            this.transactionPage();
          } else {
            this.spinner.hide();
            this.paginationTransactionReport();
            this.reportType_panel = false;
            this.isTransactionChecked = false;
            this.transactionReportDiv = false;
            this.transactionReportResultsDiv = false;
            this.messageNoSearchRecordsTransaction = false;
            this.transactionReportResultsIfRecordsDiv = false;
            this.Transactiontableshow = true;
          }
        },
        (error) => {
          this.spinner.hide();
        });
    } else {
      this.transactionReportResultsDiv = false;
    }
  }

  pullReportsData(reqType, index_req, index_owning, cgdType) {
    var totalCount = this.findCount(reqType, index_req, index_owning, cgdType);
    var requestInstCodesList: string[] = [this.instList_transactons_with_id.find(item => item.id == index_req).name];
    var owningnInstCodesList: string[] = [this.instList_transactons_with_id.find(item => item.id == index_owning).name];
    var cgdTypeList: string[] = [];
    this.requestInstCodesList = requestInstCodesList;
    this.owningnInstCodesList = owningnInstCodesList;
    this.cgdTypeList = cgdTypeList;
    this.totalCount = totalCount;
    this.transactionReport(this.requestInstCodesList, this.owningnInstCodesList, this.cgdTypeList, this.totalCount);
  }

  goBackTransaction($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.transactionPage();
  }
  transactionPage() {
    this.Transactiontableshow = false;
    this.reportType_panel = true;
    this.isTransactionChecked = true;
    this.transactionReportDiv = true;
    this.transactionReportResultsDiv = true;
    this.transactionReportResultsIfRecordsDiv = true;
  }
  paginationTransactionReport() {
    if (this.transactionReportRecords['pageNumber'] == 0 && (this.transactionReportRecords['totalPageCount'] - 1 > 0)) {
      this.firstbuttonTransaction = true;
      this.previousbuttonTransaction = true;
      this.nextbuttonTransaction = false;
      this.lastbuttonTransaction = false;
    } else if (this.transactionReportRecords['pageNumber'] == 0 && (this.transactionReportRecords['pageNumber'] == this.transactionReportRecords['totalPageCount'] - 1)) {
      this.firstbuttonTransaction = true;
      this.previousbuttonTransaction = true;
      this.nextbuttonTransaction = true;
      this.lastbuttonTransaction = true;
    }
    else if ((this.transactionReportRecords['pageNumber'] == this.transactionReportRecords['totalPageCount'] - 1) && this.transactionReportRecords['totalPageCount'] - 1 > 0) {
      this.firstbuttonTransaction = false;
      this.previousbuttonTransaction = false;
      this.nextbuttonTransaction = true;
      this.lastbuttonTransaction = true;
    } else if ((this.transactionReportRecords['pageNumber'] < this.transactionReportRecords['totalPageCount'] - 1) && (this.transactionReportRecords['pageNumber'] != 0)) {
      this.firstbuttonTransaction = false;
      this.previousbuttonTransaction = false;
      this.nextbuttonTransaction = false;
      this.lastbuttonTransaction = false;
    }
  }
  findCount(reqType, index_req, index_owning, CGD) {
    this.instList_transactons_with_id = this.instList_transactons.map(function (x, index) { return { id: index, name: x.name }; });
    var count = 0;
    for (var i = 0; i < this.transactionReportVal['transactionReportList'].length; i++) {
      if (this.transactionReportVal['transactionReportList'][i].owningInst == this.instList_transactons_with_id.find(item => item.id == index_owning).name &&
        this.transactionReportVal['transactionReportList'][i].requestingInst == this.instList_transactons_with_id.find(item => item.id == index_req).name) {
        if (reqType == 'Physical') {
          count = this.transactionReportVal['transactionReportList'][i].cgd == CGD ? count + this.transactionReportVal['transactionReportList'][i].count : count;
        } else {
          count = this.transactionReportVal['transactionReportList'][i].cgd == 'EDD' ? count + this.transactionReportVal['transactionReportList'][i].count : count;
        }
      }
    }
    return count == 0 ? '' : count;
  }

  timezone(date) {
    return this.dashBoardService.setTimeZone(date);
  }
}