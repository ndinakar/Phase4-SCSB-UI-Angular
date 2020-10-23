import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ReportsService } from 'src/app/services/reports/reports.service';
declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    $('#mydiv').hide();
    this.ReportShowBy = 'Partners';
  }

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

  subtotalEDDCULDeaccession: number;
  subtotalEDDPULDeaccession: number;
  subtotalEDDNYPLDeaccession: number;

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

  showentries = 10;

  deaccessionOwnInst: string;

  dateAccessionFrom: string;
  dateAccessionTo: string;

  dateFrom: string;
  dateTo: string;

  start: any;
  end: any;

  isChecked = false;
  fileName: string;
  dataDecode: string;
  file: File = null;

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
    "collectionGroupDesignations": [],
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

  submitRequest() {
    $('#mydiv').show();
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
      this.requestToDateErrorText = false;
      this.requestFromDateErrorText = false;

      this.requestResultsPage = true;
      this.accessionPageResponse = false;
      this.incompleteResultsPage = false;
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
        "collectionGroupDesignations": [],
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
          $('#mydiv').hide();
          if (this.reportstVal['showBy'] == "Partners") {
            this.partnersResults = true;
            this.requestTypeResults = false;
            this.subtotalPhysicalPUL = this.reportstVal['physicalPrivatePulCount'] + this.reportstVal['physicalSharedPulCount'] + this.reportstVal['physicalPartnerSharedPulCount'];
            this.subtotalPhysicalCUL = this.reportstVal['physicalPrivateCulCount'] + this.reportstVal['physicalSharedCulCount'] + this.reportstVal['physicalPartnerSharedCulCount'];
            this.subtotalPhysicalNYPL = this.reportstVal['physicalPrivateNyplCount'] + this.reportstVal['physicalSharedNyplCount'] + this.reportstVal['physicalPartnerSharedNyplCount'];
            this.subtotalEDDPUL = this.reportstVal['eddPrivatePulCount'] + this.reportstVal['eddSharedOpenPulCount'] + this.reportstVal['eddPartnerSharedOpenPulCount'];
            this.subtotalEDDCUL = this.reportstVal['eddPrivateCulCount'] + this.reportstVal['eddSharedOpenCulCount'] + this.reportstVal['eddPartnerSharedOpenCulCount'];
            this.subtotalEDDNYPL = this.reportstVal['eddPrivateNyplCount'] + this.reportstVal['eddSharedOpenNyplCount'] + this.reportstVal['eddPartnerSharedOpenNyplCount'];
            this.totalPUL = this.subtotalEDDPUL + this.subtotalPhysicalPUL;
            this.totalCUL = this.subtotalEDDCUL + this.subtotalPhysicalCUL;
            this.totalNYPL = this.subtotalEDDNYPL + this.subtotalPhysicalNYPL;
          } else {
            this.requestTypeResults = true;
            this.partnersResults = false;
            this.totalPULRequest = this.reportstVal['retrievalRequestPulCount'] + this.reportstVal['recallRequestPulCount'] + this.reportstVal['eddRequestPulCount'];
            this.totalCULRequest = this.reportstVal['retrievalRequestCulCount'] + this.reportstVal['recallRequestCulCount'] + this.reportstVal['eddRequestCulCount'];
            this.totalNYPLRequest = this.reportstVal['retrievalRequestNyplCount'] + this.reportstVal['recallRequestNyplCount'] + this.reportstVal['eddRequestNyplCount'];
          }

        },
        (error) => {

        }

      );
    }

  }
  toDate(param: string) {
    var date = new Date(param);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    var newDate = month + "/" + day + "/" + year;
    return newDate;
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
    $('#mydiv').show();
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
      this.requestResultsPage = false;
      this.accessionPageResponse = true;
      this.incompleteResultsPage = false;
      this.postData = {
        "showBy": null,
        "requestType": "Accession/Deaccesion",
        "requestFromDate": this.dateAccessionFrom,
        "requestToDate": this.dateAccessionTo,
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
        "collectionGroupDesignations": [],
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
          $('#mydiv').hide();
          this.subtotalEDDPULDeaccession = this.reportstVal['deaccessionPrivatePulCount'] + this.reportstVal['deaccessionSharedPulCount'] + this.reportstVal['deaccessionOpenPulCount'];
          this.subtotalEDDCULDeaccession = this.reportstVal['deaccessionPrivateCulCount'] + this.reportstVal['deaccessionSharedCulCount'] + this.reportstVal['deaccessionOpenCulCount'];
          this.subtotalEDDNYPLDeaccession = this.reportstVal['deaccessionPrivateNyplCount'] + this.reportstVal['deaccessionSharedNyplCount'] + this.reportstVal['deaccessionOpenNyplCount'];

        },
        (error) => {

        }

      );
    }
  }
  incompleteRecords() {
    $('#mydiv').show();
    this.incompleteErrorText = false;
    this.statusRequest = false;
    if (this.incompleteShowBy == '' || this.incompleteShowBy == undefined) {
      this.incompleteErrorText = true;
      this.statusRequest = true;
    }
    if (!this.statusRequest) {
      this.errorMessageId = false;
      this.requestResultsPage = false;
      this.accessionPageResponse = false;
      this.postData = {
        "showBy": "Partners",
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
        "collectionGroupDesignations": [],
        "deaccessionItemResultsRows": [],

        "showDeaccessionInformationTable": false,

        "totalRecordsCount": "0",
        "pageNumber": 0,
        "pageSize": 10,
        "totalPageCount": 0,
        "deaccessionOwnInst": null,
        "incompleteRequestingInstitution": this.incompleteShowBy,
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

      this.reportsService.incompleteRecords(this.postData).subscribe(
        (res) => {
          this.reportstVal = res;
          $('#mydiv').hide();
          this.incompleteResultsPage = true;
          if (this.reportstVal['errorMessage'] != null || this.reportstVal['errorMessage'] != undefined) {
            this.errorMessageId = true;
          } else {
            this.errorMessageId = false;
          }
          this.pagination();
        },
        (error) => {

        }

      );
    }
  }

  enableRequestPage() {
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
  }
  enableAccessionPage() {
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
  }
  enableCGDPage() {
    $('#mydiv').show();
    this.resetFields();
    this.requestPage = false;
    this.accesionPage = false;
    this.cgdPage = true;
    this.incompletePage = false;
    this.reportsService.collectionGroupDesignation().subscribe(
      (res) => {
        this.reportstVal = res;
        $('#mydiv').hide();
      },
      (error) => {

      }

    );
  }
  enableincompletePage() {
    this.resetFields();
    this.requestPage = false;
    this.accesionPage = false;
    this.cgdPage = false;
    this.incompletePage = true;
    this.getInstitutions();
  }
  incompleteReportPageSizeChange(value) {
    this.showentries = value;
    this.postData = {
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
      "collectionGroupDesignations": [],
      "deaccessionItemResultsRows": [],

      "showDeaccessionInformationTable": false,

      "totalRecordsCount": "0",
      "pageNumber": this.reportstVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": this.reportstVal['totalPageCount'],
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

    this.reportsService.incompleteReportPageSizeChange(this.postData).subscribe(
      (res) => {
        this.reportstVal = res;
      },
      (error) => {

      }

    );
  }
  deaccessionInformationOnChange(entriesSize) {
    this.showentries = entriesSize;
    this.deaccessionInformation();
  }
  deaccessionInformation() {
    this.postData = {
      "showBy": "Partners",
      "requestType": "Accession/Deaccesion",
      "requestFromDate": null,
      "requestToDate": null,
      "accessionDeaccessionFromDate": this.toDate(this.AccessionDeaccessionDateRangefrom),
      "accessionDeaccessionToDate": this.toDate(this.AccessionDeaccessionDateRangeto),

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
      "collectionGroupDesignations": [],
      "deaccessionItemResultsRows": [],

      "showDeaccessionInformationTable": false,

      "totalRecordsCount": "0",
      "pageNumber": 0,
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "deaccessionOwnInst": this.deaccessionOwnInst,
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

    this.reportsService.deaccessionInformation(this.postData).subscribe(
      (res) => {
        this.deaccessionRes = res;
        this.accessionPageResponse = false;
        this.accesionPage = false;
        this.reportType_panel = false;
        this.Deaccessiontableshow = true;
        this.pagination();
      },
      (error) => {

      }

    );
  }
  firstCall() {
    this.postData = {
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
      "collectionGroupDesignations": [],
      "deaccessionItemResultsRows": [],

      "showDeaccessionInformationTable": false,

      "totalRecordsCount": "0",
      "pageNumber": 0,
      "pageSize": this.showentries,
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

    this.reportsService.firstCall(this.postData).subscribe(
      (res) => {
        this.reportstVal = res;
        this.pagination();
      },
      (error) => {

      }

    );
  }
  nextCall() {
    this.postData = {
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
      "collectionGroupDesignations": [],
      "deaccessionItemResultsRows": [],

      "showDeaccessionInformationTable": false,

      "totalRecordsCount": "0",
      "pageNumber": this.reportstVal['pageNumber'],
      "pageSize": this.showentries,
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

    this.reportsService.nextCall(this.postData).subscribe(
      (res) => {
        this.reportstVal = res;
        this.pagination();
      },
      (error) => {

      }

    );
  }
  previousCall() {
    this.postData = {
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
      "collectionGroupDesignations": [],
      "deaccessionItemResultsRows": [],

      "showDeaccessionInformationTable": false,

      "totalRecordsCount": "0",
      "pageNumber": this.reportstVal['pageNumber'],
      "pageSize": this.showentries,
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

    this.reportsService.previousCall(this.postData).subscribe(
      (res) => {
        this.reportstVal = res;
        this.pagination();
      },
      (error) => {

      }

    );
  }
  lastCall() {
    this.postData = {
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
      "collectionGroupDesignations": [],
      "deaccessionItemResultsRows": [],

      "showDeaccessionInformationTable": false,

      "totalRecordsCount": "0",
      "pageNumber": this.reportstVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": this.reportstVal['totalPageCount'],
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

    this.reportsService.lastCall(this.postData).subscribe(
      (res) => {
        this.reportstVal = res;
        this.pagination();
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
      },
      (error) => {

      }

    );
  }
  pagination() {
    if (this.reportstVal['pageNumber'] == 0 && (this.reportstVal['totalPageCount'] - 1 > 0)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = false;
      this.lastbutton = false;
    } else if (this.reportstVal['pageNumber'] == 0 && (this.reportstVal['pageNumber'] == this.reportstVal['totalPageCount'] - 1)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = true;
      this.lastbutton = true;
    }
    else if ((this.reportstVal['pageNumber'] == this.reportstVal['totalPageCount'] - 1) && this.reportstVal['totalPageCount'] - 1 > 0) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = true;
      this.lastbutton = true;
    } else if ((this.reportstVal['pageNumber'] < this.reportstVal['totalPageCount'] - 1) && (this.reportstVal['pageNumber'] != 0)) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = false;
      this.lastbutton = false;
    } else if (this.reportstVal['pageNumber'] == 0 && this.reportstVal['totalPageCount'] == 0) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = true;
      this.lastbutton = true;
    }
  }

  getInstitutionsShowBy(inst) {
    this.reportsService.getInstitutions().subscribe(
      (res) => {
        this.reportstVal = res;
        this.incompleteShowBy = inst;
      },
      (error) => {

      }

    );
  }
  deaccessionPul() {
    this.deaccessionOwnInst = 'PUL';
    this.deaccessionInformation();
  }
  deaccessionCul() {
    this.deaccessionOwnInst = 'CUL';
    this.deaccessionInformation();
  }
  deaccessionNypl() {
    this.deaccessionOwnInst = 'NYPL';
    this.deaccessionInformation();
  }
  resetFields() {
    this.AccessionDeaccessionDateRangefrom = '';
    this.AccessionDeaccessionDateRangeto = '';
    this.RequestDateRangefrom = '';
    this.RequestDateRangeto = '';
  }
  reportShowBy() {
    this.requestResultsPage = false;
  }
  goBack($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.accessionPageResponse = true;
    this.accesionPage = true;
    this.reportType_panel = true;
    this.Deaccessiontableshow = false;
    this.isChecked = true;
  }
  exportRecords() {
    console.log("test");
    this.postData = {
      "showBy": "Partners",
      "requestType": "IncompleteRecordsReport",
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
      "collectionGroupDesignations": [],
      "deaccessionItemResultsRows": [],

      "showDeaccessionInformationTable": false,

      "totalRecordsCount": "0",
      "pageNumber": 0,
      "pageSize": 10,
      "totalPageCount": 0,
      "deaccessionOwnInst": null,
      "incompleteRequestingInstitution": this.incompleteShowBy,
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
    this.reportsService.exportData(this.postData).subscribe(
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
}
