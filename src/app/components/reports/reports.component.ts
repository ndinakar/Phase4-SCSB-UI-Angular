import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { TreeNode } from 'primeng/api';
import { ReportsService } from 'src/app/services/reports/reports.service';
declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportsService: ReportsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.hide();
    this.ReportShowBy = 'Partners';
  }
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
          this.requestResultsPage = false;
          this.accessionPageResponse = true;
          this.incompleteResultsPage = false;
          this.accesionPage = true;
          this.reportType_panel = true;
          this.Deaccessiontableshow = false;
          this.isChecked = true;
          var totalCountDeacc = 0;
          for (var i = 0; i < this.reportstVal['reportsInstitutionFormList'].length; i++) {
            totalCountDeacc = this.reportstVal['reportsInstitutionFormList'][i].deaccessionPrivateCount + this.reportstVal['reportsInstitutionFormList'][i].deaccessionSharedCount + this.reportstVal['reportsInstitutionFormList'][i].deaccessionOpenCount;
            this.subtotalEDDDeaccession.push(totalCountDeacc);
          }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
        }

      );
    }
  }
  incompleteRecords() {
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
          } else {
            this.errorMessageId = false;
            this.incompleteResultsDiv = true;
            this.incompletetotalPaginationDiv = true;
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
  }
  enableCGDPage() {
    this.spinner.show();
    this.resetFields();
    this.reportsService.collectionGroupDesignation().subscribe(
      (res) => {
        this.requestPage = false;
        this.accesionPage = false;
        this.cgdPage = true;
        this.incompletePage = false;
        this.reportstVal = res;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      });
  }
  enableincompletePage() {
    this.spinner.hide();
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
        this.reportstVal = res;
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
        this.requestPage = false;
        this.accesionPage = false;
        this.cgdPage = false;
        this.incompletePage = true;
        this.incompleteShowBy = this.instVal['incompleteShowByInst'][0];
      },
      (error) => {

      }

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
    this.ReportShowBy = 'Partners';
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
      "collectionGroupDesignations": [],
      "deaccessionItemResultsRows": [],

      "showDeaccessionInformationTable": false,

      "totalRecordsCount": "0",
      "pageNumber": this.pageNumber,
      "pageSize": this.pageSize,
      "totalPageCount": this.totalPageCount,
      "deaccessionOwnInst": null,
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
}