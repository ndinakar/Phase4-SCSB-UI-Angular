import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
declare var $: any;
import { TreeNode } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BulkRequestService } from 'src/app/services/bulkRequest/bulk-request.service';

@Component({
  selector: 'app-bulkrequest',
  templateUrl: './bulkrequest.component.html',
  styleUrls: ['./bulkrequest.component.css']
})
export class BulkrequestComponent implements OnInit {
  BulkRequestForm: FormGroup;
  bulkrequestVal: TreeNode[];
  deliveryLocVal: any[];
  createReqsection = true;
  searchReqsection = false;
  BulkRequestName: string;
  BulkRequestNameErrorMessage = false;
  BulkRequestNameLengthError = false;
  requestingInstitutionId: string;
  requestingInstitutionErrorMessage = false;
  chosenFile: string;
  formData = new FormData();
  invalidBulkRequestFile = false;
  bulkRequestFileRequired = false;
  deliveryLocation: string;
  deliveryLocationErrorMessage = false;
  patronBarcodeId: string;
  patronBarcodeErrorMessage = false;
  patronEmailId: string;
  patronEmailIdErrorMessage = false;
  EmailMandatoryErrorMessage = false;
  requestNotesId: string;
  notesLengthErrMsg = false;

  createResponse: TreeNode[];
  createRequestError: boolean;
  errorMessage: string;
  createsubmit = false;

  bulkRequestIdSearchError = false;
  bulkRequestNameSearchError = false;
  bulkPatronBarcodeSearchError = false;
  bulkRequestIdSearch: string;
  bulkRequestNameSearch: string;
  bulkPatronBarcodeSearch: string;
  institutionList: string;
  searchRequestVal: TreeNode[];
  bulkrequestNotesData: string;
  requestId : string;
  nextvalue = 0;
  previousValue = 0;
  lastValue = 0;
  showentries = 10;
  firstbutton = true;
  previousbutton = true;
  nextbutton = false;
  lastbutton = false;
  results_container = false;
  errorResponse = false;
  results_container_table = false;
  download_response : TreeNode[];
  fileName: string;
  dataDecode: string;
  file: File = null;
  constructor(private formBuilder: FormBuilder, private bulkrequestService: BulkRequestService) { }

  ngOnInit(): void {
    this.initialload();
  }

  postData = {
    "requestId": null,
    "patronBarcode": null,
    "itemBarcode": null,
    "status": null,
    "deliveryLocation": null,
    "deliveryLocationInRequest": null,
    "itemTitle": null,
    "itemOwningInstitution": null,
    "patronEmailAddress": null,
    "requestingInstitution": null,
    "requestType": null,
    "requestNotes": null,
    "message": null,
    "errorMessage": null,
    "totalRecordsCount": "0",
    "pageNumber": 0,
    "pageSize": 0,
    "totalPageCount": 0,
    "submitted": false,
    "showResults": false,
    "requestingInstitutions": [],
    "requestTypes": [],
    "deliveryLocations": [],
    "bulkSearchResultRows": [],
    "requestStatuses": [],
    "institutionList": [],
    "disableRequestingInstitution": false,
    "onChange": null,
    "showRequestErrorMsg": false,
    "requestingInstituionHidden": null,
    "disableSearchInstitution": false,
    "searchInstitutionHdn": null,
    "file": null,
    "requestIdSearch": null,
    "requestNameSearch": null,
    "patronBarcodeSearch": null,
    "institution": null,
    "bulkRequestName": null,
    "patronBarcodeInRequest": null,
    "fileName": null
  }

  initialload() {
    this.bulkrequestService.loadCreateRequest().subscribe(
      (res) => {
        this.bulkrequestVal = res;
        this.BulkRequestName = '';
        this.requestingInstitutionId = '';
        this.chosenFile = '';
        this.deliveryLocation = '';
        this.patronBarcodeId = '';
        this.patronEmailId = '';
        this.requestNotesId = '';

      },
      (error) => {

      }

    );
  }

  initialloadnew() {
    this.bulkrequestService.loadCreateRequest().subscribe(
      (res) => {
        this.bulkrequestVal = res;
        this.BulkRequestName = '';
        this.requestingInstitutionId = '';
        this.chosenFile = '';
        this.deliveryLocation = '';
        this.patronEmailId = '';
        this.requestNotesId = '';

      },
      (error) => {

      }

    );
  }

  loadSearchRequest() {
    this.createReqsection = false;
    this.searchReqsection = true;

  }
  loadCreateRequest() {
    this.results_container = false;
    this.createReqsection = true;
    this.searchReqsection = false;
    this.deliveryLocVal = [];
    this.initialload();
    this.createsubmit = false;
    this.results_container_table = false;
    this.results_container = false;
    this.bulkRequestIdSearch = '';
    this.bulkRequestNameSearch = '';
    this.bulkPatronBarcodeSearch = '';
    this.institutionList = '';
    this.errorResponse = false;
  }

  loadCreateRequestForSamePatron() {
    this.createReqsection = true;
    this.searchReqsection = false;
    this.deliveryLocVal = [];
    this.initialloadnew();
    this.createsubmit = false;
  }

  NotesLengthValidation(val) {
    var requestNotesId = $('#requestNotesId').val();
    var NoteLength = requestNotesId.length;
    var len = val.length;
    if (len > 2000) {
      val = val.substring(0, 2000);
    } else {
      $('#remainingCharacters').text(1000 - len);
    }

  }

  validateEmailAddress(val) {
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    if (!pattern.test(val)) {
      this.patronEmailIdErrorMessage = true;
    } else {
      this.patronEmailIdErrorMessage = false;
    }
  }

  onChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
       this.file = fileList[0];
      this.chosenFile = this.file.name;

      this.formData.append('file', this.file);

    }
  }

  populateDeliveryLocations(institution) {
    this.postData = {
      "requestId": null,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": institution,
      "requestType": null,
      "requestNotes": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": 0,
      "pageSize": 10,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [],
      "requestTypes": [],
      "deliveryLocations": [],
      "bulkSearchResultRows": [],
      "requestStatuses": [],
      "institutionList": [],
      "disableRequestingInstitution": false,
      "onChange": null,
      "showRequestErrorMsg": false,
      "requestingInstituionHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null,
      "file": null,
      "requestIdSearch": null,
      "requestNameSearch": null,
      "patronBarcodeSearch": null,
      "institution": null,
      "bulkRequestName": null,
      "patronBarcodeInRequest": null,
      "fileName": null
    }

    this.bulkrequestService.populateDeliveryLocations(this.postData).subscribe(
      (res) => {
        var del = res['deliveryLocations'];
        this.deliveryLocVal = Object.keys(del).map(function (data) {
          return [data, del[data]];
        });

      },
      (error) => {

      }

    );

  }

  createBulkRequest() {
    if ((this.BulkRequestName == undefined || this.BulkRequestName == '') && (this.requestingInstitutionId == undefined || this.requestingInstitutionId == '') && (this.chosenFile == undefined || this.chosenFile == '') && (this.deliveryLocation == undefined || this.deliveryLocation == '') && (this.patronBarcodeId == undefined || this.patronBarcodeId == '') && (this.patronEmailId == undefined || this.patronEmailId == '')) {
      this.BulkRequestNameErrorMessage = true;
      this.requestingInstitutionErrorMessage = true;
      this.bulkRequestFileRequired = true;
      this.deliveryLocationErrorMessage = true;
      this.patronBarcodeErrorMessage = true;
      this.EmailMandatoryErrorMessage = true;
    }
    else if (this.BulkRequestName == undefined || this.BulkRequestName == '') {
      this.BulkRequestNameErrorMessage = true;
    }
    else if (this.requestingInstitutionId == undefined || this.requestingInstitutionId == '') {
      this.requestingInstitutionErrorMessage = true;
    } else if (this.chosenFile == undefined || this.chosenFile == '') {
      this.bulkRequestFileRequired = true;
    } else if (this.patronEmailId == undefined || this.patronEmailId == '' || this.patronEmailIdErrorMessage == true) {
      this.EmailMandatoryErrorMessage = true;
    } else if (this.deliveryLocation == undefined || this.deliveryLocation == '') {
      this.deliveryLocationErrorMessage = true;
    } else if (this.patronBarcodeId == undefined || this.patronBarcodeId == '') {
      this.patronBarcodeErrorMessage = true;
    } else {
      this.BulkRequestNameErrorMessage = false;
      this.requestingInstitutionErrorMessage = false;
      this.bulkRequestFileRequired = false;
      this.deliveryLocationErrorMessage = false;
      this.patronBarcodeErrorMessage = false;
      this.EmailMandatoryErrorMessage = false;
      this.postData = {
        "requestId": null,
        "patronBarcode": null,
        "itemBarcode": null,
        "status": null,
        "deliveryLocation": this.deliveryLocation,
        "deliveryLocationInRequest": this.deliveryLocation,
        "itemTitle": null,
        "itemOwningInstitution": "PUL",
        "patronEmailAddress": null,
        "requestingInstitution": "PUL",
        "requestType": null,
        "requestNotes": null,
        "message": null,
        "errorMessage": null,
        "totalRecordsCount": "0",
        "pageNumber": 0,
        "pageSize": 10,
        "totalPageCount": 0,
        "submitted": false,
        "showResults": false,
        "requestingInstitutions": [],
        "requestTypes": [],
        "deliveryLocations": [],
        "bulkSearchResultRows": [],
        "requestStatuses": [],
        "institutionList": [],
        "disableRequestingInstitution": false,
        "onChange": null,
        "showRequestErrorMsg": false,
        "requestingInstituionHidden": null,
        "disableSearchInstitution": false,
        "searchInstitutionHdn": null,
        "file": this.formData['file'],
        "requestIdSearch": null,
        "requestNameSearch": null,
        "patronBarcodeSearch": null,
        "institution": this.requestingInstitutionId,
        "bulkRequestName": this.BulkRequestName,
        "patronBarcodeInRequest": this.patronBarcodeId,
        "fileName": this.chosenFile
      }
      console.log(this.formData['file']);
      this.bulkrequestService.createBulkRequest(this.postData).subscribe(
        (res) => {
          this.createResponse = res;
          if (this.createResponse['errorMessage'] != null) {
            this.errorMessage = this.createResponse['errorMessage'];
            this.createRequestError = true;
          } else {
            this.createsubmit = true;
            this.createRequestError = false;
          }

        },
        (error) => {

        }

      );
    }
  }


  resetDefaults() {
    this.deliveryLocVal = [];
    this.initialload();
    this.createsubmit = false;
    this.BulkRequestNameErrorMessage = false;
    this.requestingInstitutionErrorMessage = false;
    this.bulkRequestFileRequired = false;
    this.deliveryLocationErrorMessage = false;
    this.patronBarcodeErrorMessage = false;
    this.EmailMandatoryErrorMessage = false;
  }

  //**********************search Request start*******************
  searchRequests() {
    this.postData = {
      "requestId": null,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": null,
      "requestType": null,
      "requestNotes": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": 0,
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [],
      "requestTypes": [],
      "deliveryLocations": [],
      "bulkSearchResultRows": [],
      "requestStatuses": [],
      "institutionList": [],
      "disableRequestingInstitution": false,
      "onChange": null,
      "showRequestErrorMsg": false,
      "requestingInstituionHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null,
      "file": null,
      "requestIdSearch": this.bulkRequestIdSearch,
      "requestNameSearch": this.bulkRequestNameSearch,
      "patronBarcodeSearch": this.bulkPatronBarcodeSearch,
      "institution": this.institutionList,
      "bulkRequestName": null,
      "patronBarcodeInRequest": null,
      "fileName": null
    }
    this.bulkrequestService.searchRequest(this.postData).subscribe(
      (res) => {
        this.searchRequestVal = res;
        this.results_container = true;
        this.results_container_table = true;
        this.errorResponse = false;
        this.pagination();
        if (this.searchRequestVal['message'] != null) {
          this.errorResponse = true;
          this.results_container = false;
          this.results_container_table = false;
        }
      },
      (error) => {

      }

    );
  }

  reqNotemodal(notes) {
    this.bulkrequestNotesData = notes;
    $('#requestNotesModal').modal({ show: true });
  }

  firstCall() {
    this.postData = {
      "requestId": null,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": "PUL",
      "patronEmailAddress": null,
      "requestingInstitution": "PUL",
      "requestType": null,
      "requestNotes": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": 0,
      "pageSize": this.searchRequestVal['pageSize'],
      "totalPageCount": this.searchRequestVal['totalPageCount'],
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [],
      "requestTypes": [],
      "deliveryLocations": [],
      "bulkSearchResultRows": [],
      "requestStatuses": [],
      "institutionList": [],
      "disableRequestingInstitution": false,
      "onChange": null,
      "showRequestErrorMsg": false,
      "requestingInstituionHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null,
      "file": null,
      "requestIdSearch": this.bulkRequestIdSearch,
      "requestNameSearch": this.bulkRequestNameSearch,
      "patronBarcodeSearch": this.bulkPatronBarcodeSearch,
      "institution": this.institutionList,
      "bulkRequestName": null,
      "patronBarcodeInRequest": null,
      "fileName": null
    }
    this.bulkrequestService.firstCall(this.postData).subscribe(
      (res) => {
        this.searchRequestVal = res;
        this.pagination();
      },
      (error) => {

      }

    );
  }

  previousCall() {
    this.showentries = this.searchRequestVal['pageSize'];
    this.postData = {
      "requestId": null,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": null,
      "requestType": null,
      "requestNotes": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": this.searchRequestVal['totalRecordsCount'],
      "pageNumber": this.searchRequestVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": this.searchRequestVal['totalPageCount'],
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [],
      "requestTypes": [],
      "deliveryLocations": [],
      "bulkSearchResultRows": [],
      "requestStatuses": [],
      "institutionList": [],
      "disableRequestingInstitution": false,
      "onChange": null,
      "showRequestErrorMsg": false,
      "requestingInstituionHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null,
      "file": null,
      "requestIdSearch": this.bulkRequestIdSearch,
      "requestNameSearch": this.bulkRequestNameSearch,
      "patronBarcodeSearch": this.bulkPatronBarcodeSearch,
      "institution": this.institutionList,
      "bulkRequestName": null,
      "patronBarcodeInRequest": null,
      "fileName": null
    }
    this.bulkrequestService.previousCall(this.postData).subscribe(
      (res) => {
        this.searchRequestVal = res;
        this.pagination();
      },
      (error) => {

      }

    );
  }

  nextCall() {
    this.showentries = this.searchRequestVal['pageSize'];
    this.postData = {
      "requestId": null,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": "PUL",
      "patronEmailAddress": null,
      "requestingInstitution": "PUL",
      "requestType": null,
      "requestNotes": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": this.searchRequestVal['totalRecordsCount'],
      "pageNumber": this.searchRequestVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": this.searchRequestVal['totalPageCount'],
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [],
      "requestTypes": [],
      "deliveryLocations": [],
      "bulkSearchResultRows": [],
      "requestStatuses": [],
      "institutionList": [],
      "disableRequestingInstitution": false,
      "onChange": null,
      "showRequestErrorMsg": false,
      "requestingInstituionHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null,
      "file": null,
      "requestIdSearch": this.bulkRequestIdSearch,
      "requestNameSearch": this.bulkRequestNameSearch,
      "patronBarcodeSearch": this.bulkPatronBarcodeSearch,
      "institution": this.institutionList,
      "bulkRequestName": null,
      "patronBarcodeInRequest": null,
      "fileName": null
    }
    this.bulkrequestService.nextCall(this.postData).subscribe(
      (res) => {
        this.searchRequestVal = res;
        this.pagination();
      },
      (error) => {

      }

    );
  }

  lastCall() {
    this.showentries = this.searchRequestVal['pageSize'];
    this.postData = {
      "requestId": null,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": "PUL",
      "patronEmailAddress": null,
      "requestingInstitution": "PUL",
      "requestType": null,
      "requestNotes": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": this.searchRequestVal['totalRecordsCount'],
      "pageNumber": this.searchRequestVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": this.searchRequestVal['totalPageCount'],
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [],
      "requestTypes": [],
      "deliveryLocations": [],
      "bulkSearchResultRows": [],
      "requestStatuses": [],
      "institutionList": [],
      "disableRequestingInstitution": false,
      "onChange": null,
      "showRequestErrorMsg": false,
      "requestingInstituionHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null,
      "file": null,
      "requestIdSearch": this.bulkRequestIdSearch,
      "requestNameSearch": this.bulkRequestNameSearch,
      "patronBarcodeSearch": this.bulkPatronBarcodeSearch,
      "institution": this.institutionList,
      "bulkRequestName": null,
      "patronBarcodeInRequest": null,
      "fileName": null
    }
    this.bulkrequestService.lastCall(this.postData).subscribe(
      (res) => {
        this.searchRequestVal = res;
        this.pagination();
      },
      (error) => {

      }

    );
  }


  onPageSizeChange(value) {
    this.showentries = value;
    this.postData = {
      "requestId": null,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": "PUL",
      "patronEmailAddress": null,
      "requestingInstitution": "PUL",
      "requestType": null,
      "requestNotes": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": this.searchRequestVal['totalRecordsCount'],
      "pageNumber": this.searchRequestVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": this.searchRequestVal['totalPageCount'],
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [],
      "requestTypes": [],
      "deliveryLocations": [],
      "bulkSearchResultRows": [],
      "requestStatuses": [],
      "institutionList": [],
      "disableRequestingInstitution": false,
      "onChange": null,
      "showRequestErrorMsg": false,
      "requestingInstituionHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null,
      "file": null,
      "requestIdSearch": this.bulkRequestIdSearch,
      "requestNameSearch": this.bulkRequestNameSearch,
      "patronBarcodeSearch": this.bulkPatronBarcodeSearch,
      "institution": this.institutionList,
      "bulkRequestName": null,
      "patronBarcodeInRequest": null,
      "fileName": null
    }
    this.bulkrequestService.onRequestPageSizeChange(this.postData).subscribe(
      (res) => {
        this.searchRequestVal = res;
        this.pagination();
      },
      (error) => {

      }

    );
  }

  pagination() {
    if (this.searchRequestVal['pageNumber'] == 0 && (this.searchRequestVal['totalPageCount'] - 1 > 0)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = false;
      this.lastbutton = false;
    } else if (this.searchRequestVal['pageNumber'] == 0 && (this.searchRequestVal['pageNumber'] == this.searchRequestVal['totalPageCount'] - 1)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = true;
      this.lastbutton = true;
    }
    else if ((this.searchRequestVal['pageNumber'] == this.searchRequestVal['totalPageCount'] - 1) && this.searchRequestVal['totalPageCount'] - 1 > 0) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = true;
      this.lastbutton = true;
    } else if ((this.searchRequestVal['pageNumber'] < this.searchRequestVal['totalPageCount'] - 1) && (this.searchRequestVal['pageNumber'] != 0)) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = false;
      this.lastbutton = false;
    }
  }
  downloadReports(requestId){
  this.bulkrequestService.downloadReports(requestId).subscribe(
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
    }

  );

 
  } 

}
