import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { TreeNode } from 'primeng/api';
import { RequestService } from 'src/app/services/request/request.service';


declare var $: any;

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  institutions: any = [];
  requestTypes: any = [];
  status_fields = true;
  requestForm: FormGroup;
  firstbutton = true;
  previousbutton = true;
  nextbutton = false;
  lastbutton = false;
  messageNoSearchRecords = false;
  searchReqresultFirst = false;
  searchBar = false;
  create_request = false;
  itemBarcodeId: string;
  requestingInstitutionId: string;
  itemTitleId: string;
  itemOwningInstitutionId: string;
  patronBarcodeId: string;
  patronEmailId: string;
  requestTypeId: string;
  deliveryLocationId: string;
  requestNotesId: string;
  notesLengthErrMsg = false;
  requestVal: TreeNode[];
  requestTypeErrorMessage = false;
  requestingInstitutionErrorMessage = false;
  deliveryLocationErrorMessage = false;
  itemBarcodeErrorMessage = false;
  itemBarcodeNotFoundErrorMessage = false;
  patronBarcodeErrorMessage = false
  itembarcodeVal: TreeNode[];
  deliveryLocVal: any[];
  eddshow = false;
  startPageErrorMessage = false;
  endPageErrorMessage = false;
  articleTitleErrorMessage = false;
  patronEmailIdErrorMessage = false;
  EmailMandatoryErrorMessage = false;

  StartPage: string;
  EndPage: string;
  VolumeNumber: string;
  Issue: string;
  ArticleAuthor: string;
  ChapterTitle: string;
  createsubmit = false;

  searchReqVal: TreeNode[];
  searchPatronBarcode: string;
  searchItemBarcode: string;
  requestStatus: string;
  searchInstitutionList: string;
  searchReqresult = false;
  patronBarcodeSearchError = false;
  itemBarcodeSearchError = false;
  noteAll = true;
  noteActive = false;
  searchreqResultVal: TreeNode[];

  requestNotesData: string;
  resubmitReqConfirmItemBarcode: string;
  requestId: string;
  resubmitRequestConfirmBodyId = true;
  reqcancelmsg: string;
  nextvalue = 0;
  previousValue = 0;
  lastValue = 0;
  showentries = 10;

  barcode_id: string;

  resubmitResponse: TreeNode[];
  resubmitResponseMessage: string;
  createResponse: TreeNode[];
  status: boolean;
  createRequestError: boolean;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder, private requestService: RequestService, private router: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.barcode_id = params.get('barcode');
      if (this.barcode_id) {
        this.itemBarcodeId = this.barcode_id;
        this.populateItemDetails(this.barcode_id);
        this.initialloadroute();
      } else {
        this.initialload();
      }
    });

    this.requestForm = this.formBuilder.group({
      barcodeFieldName: ['']
    });
  }
  postData = {
    "requestId": null,
    "patronBarcode": null,
    "itemBarcode": null,
    "status": null,
    "deliveryLocation": null,
    "patronBarcodeInRequest": null,
    "itemBarcodeInRequest": null,
    "deliveryLocationInRequest": null,
    "itemTitle": null,
    "itemOwningInstitution": null,
    "patronEmailAddress": null,
    "requestingInstitution": null,
    "requestType": null,
    "requestNotes": null,
    "startPage": null,
    "endPage": null,
    "volumeNumber": null,
    "issue": null,
    "articleAuthor": null,
    "articleTitle": null,
    "message": null,
    "errorMessage": null,
    "totalRecordsCount": "0",
    "pageNumber": 0,
    "pageSize": this.showentries,
    "totalPageCount": 0,
    "submitted": false,
    "showResults": false,
    "requestingInstitutions": [

    ],
    "requestTypes": [

    ],
    "deliveryLocations": [

    ],
    "searchResultRows": [

    ],
    "requestStatuses": [

    ],
    "institutionList": [

    ],
    "disableRequestingInstitution": false,
    "onChange": null,
    "institution": null,
    "showRequestErrorMsg": null,
    "requestingInstituionHidden": null,
    "itemBarcodeHidden": null,
    "disableSearchInstitution": false,
    "searchInstitutionHdn": null
  }
  initialload() {
    this.institutions = [];
    this.createRequestError = false;
    this.create_request = true;
    this.requestService.loadCreateRequest().subscribe(
      (res) => {
        this.requestVal = res;
        for (var i = 0; i < this.requestVal['requestingInstitutions'].length; i++) {
          this.institutions.push(this.requestVal['requestingInstitutions'][i]);
        }
        for (var j = 0; j < this.requestVal['requestTypes'].length; j++) {
          this.requestTypes.push(this.requestVal['requestTypes'][j]);
        }
        this.requestTypeId = this.requestVal['requestType'];
        this.itemBarcodeId = '';
        this.requestingInstitutionId = '';
        this.itemTitleId = '';
        this.itemOwningInstitutionId = '';
        this.patronBarcodeId = '';
        this.patronEmailId = '';
        this.deliveryLocationId = '';
        this.requestNotesId = '';
        this.StartPage = '';
        this.EndPage = '';
        this.VolumeNumber = '';
        this.Issue = '';
        this.ArticleAuthor = '';
        this.ChapterTitle = '';
      },
      (error) => {
        this.spinner.hide();
      }

    );
  }

  initialloadroute() {
    this.create_request = true;
    this.requestService.loadCreateRequest().subscribe(
      (res) => {
        this.requestVal = res;
        for (var i = 0; i < this.requestVal['requestingInstitutions'].length; i++) {
          this.institutions.push(this.requestVal['requestingInstitutions'][i]);
        }
        for (var j = 0; j < this.requestVal['requestTypes'].length; j++) {
          this.requestTypes.push(this.requestVal['requestTypes'][j]);
        }
        this.requestTypeId = this.requestVal['requestType'];
        this.requestingInstitutionId = '';
        this.patronBarcodeId = '';
        this.patronEmailId = '';
        this.deliveryLocationId = '';
        this.requestNotesId = '';
        this.StartPage = '';
        this.EndPage = '';
        this.VolumeNumber = '';
        this.Issue = '';
        this.ArticleAuthor = '';
        this.ChapterTitle = '';
      },
      (error) => {
      }

    );
  }

  loadSearchRequest() {
    this.spinner.show();
    this.searchInstitutionList = '';
    this.requestStatus = '';
    this.searchPatronBarcode = '';
    this.searchItemBarcode = '';
    this.searchReqresult = false;
    this.create_request = false;
    this.messageNoSearchRecords = false;
    this.requestService.loadSearchRequest().subscribe(
      (res) => {
        this.searchReqVal = res;
        this.searchBar = true;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }

    );
  }
  loadCreateRequestnew() {
    this.searchBar = false;
    this.create_request = true;
    this.createsubmit = false;
    this.itemBarcodeId = '';
    this.requestingInstitutionId = '';
    this.itemTitleId = '';
    this.itemOwningInstitutionId = '';
    this.patronBarcodeId = '';
    this.patronEmailId = '';
    this.deliveryLocationId = '';
    this.requestNotesId = '';
    this.StartPage = '';
    this.EndPage = '';
    this.VolumeNumber = '';
    this.Issue = '';
    this.ArticleAuthor = '';
    this.ChapterTitle = '';
    this.initialload();
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

  populateItemDetails(itemBarcodeId) {
    this.postData = {
      "requestId": null,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "patronBarcodeInRequest": null,
      "itemBarcodeInRequest": itemBarcodeId,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": "PUL",
      "requestType": null,
      "requestNotes": null,
      "startPage": null,
      "endPage": null,
      "volumeNumber": null,
      "issue": null,
      "articleAuthor": null,
      "articleTitle": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": 0,
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [

      ],
      "requestTypes": [
      ],
      "deliveryLocations": [

      ],
      "searchResultRows": [

      ],
      "requestStatuses": [

      ],
      "institutionList": [

      ],
      "disableRequestingInstitution": false,
      "onChange": false,
      "institution": null,
      "showRequestErrorMsg": null,
      "requestingInstituionHidden": null,
      "itemBarcodeHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null
    }
    this.requestService.populateItemtDetails(this.postData).subscribe(
      (res) => {
        this.itembarcodeVal = res;
        if (this.itembarcodeVal['errorMessage'] != null) {
          this.itemBarcodeNotFoundErrorMessage = true;
          this.itemTitleId = '';
          this.itemOwningInstitutionId = '';
        } else {
          this.itemBarcodeNotFoundErrorMessage = false;
          this.itemTitleId = this.itembarcodeVal['itemTitle'];
          this.itemOwningInstitutionId = this.itembarcodeVal['itemOwningInstitution'];
        }

      },
      (error) => {

      }
    );

  }
  populateDeliveryLocations(insituval) {

    this.postData = {
      "requestId": null,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "patronBarcodeInRequest": null,
      "itemBarcodeInRequest": this.itemBarcodeId,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": insituval,
      "requestType": null,
      "requestNotes": null,
      "startPage": null,
      "endPage": null,
      "volumeNumber": null,
      "issue": null,
      "articleAuthor": null,
      "articleTitle": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": null,
      "pageNumber": 0,
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [

      ],
      "requestTypes": [
      ],
      "deliveryLocations": [

      ],
      "searchResultRows": [

      ],
      "requestStatuses": [

      ],
      "institutionList": [

      ],
      "disableRequestingInstitution": false,
      "onChange": true,
      "institution": null,
      "showRequestErrorMsg": null,
      "requestingInstituionHidden": null,
      "itemBarcodeHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null
    }
    this.requestService.populateItemtDetails(this.postData).subscribe(
      (res) => {
        var del = res['deliveryLocation'];
        this.deliveryLocVal = Object.keys(del).map(function (data) {
          return [data, del[data]];
        });

      },
      (error) => {

      }
    );

  }

  reqTpeEDD(val) {
    this.deliveryLocationErrorMessage = false;
    if (val == 'EDD') {
      this.eddshow = true;
      this.removeErrorMessagesofnEDD();
    } else {
      this.eddshow = false;
      this.removeErrorMessagesofEDD();
    }

  }

  removeErrorMessagesofEDD() {
    this.itemBarcodeErrorMessage = false;
    this.requestingInstitutionErrorMessage = false;
    this.patronBarcodeErrorMessage = false;
    this.EmailMandatoryErrorMessage = false;
    this.requestTypeErrorMessage = false;
    this.startPageErrorMessage = false;
    this.endPageErrorMessage = false;
    this.articleTitleErrorMessage = false;
  }
  removeErrorMessagesofnEDD() {
    this.itemBarcodeErrorMessage = false;
    this.requestingInstitutionErrorMessage = false;
    this.patronBarcodeErrorMessage = false;
    this.deliveryLocationErrorMessage = false;
    this.requestTypeErrorMessage = false;
  }
  validateEmailAddress(val) {
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    if (!pattern.test(val)) {
      this.patronEmailIdErrorMessage = true;
    } else {
      this.patronEmailIdErrorMessage = false;
    }
  }
  createRequest() {
    if (this.eddshow) {
      if (this.validateInputs_edd()) {
        this.itemBarcodeErrorMessage = false;
        this.requestingInstitutionErrorMessage = false;
        this.patronBarcodeErrorMessage = false;
        this.EmailMandatoryErrorMessage = false;
        this.startPageErrorMessage = false;
        this.endPageErrorMessage = false;
        this.articleTitleErrorMessage = false;
        this.postData = {
          "requestId": null,
          "patronBarcode": this.patronBarcodeId,
          "itemBarcode": this.itemBarcodeId,
          "status": null,
          "deliveryLocation": this.deliveryLocationId,
          "patronBarcodeInRequest": this.patronBarcodeId,
          "itemBarcodeInRequest": this.itemBarcodeId,
          "deliveryLocationInRequest": this.deliveryLocationId,
          "itemTitle": this.itemTitleId,
          "itemOwningInstitution": this.itemOwningInstitutionId,
          "patronEmailAddress": this.patronEmailId,
          "requestingInstitution": this.requestingInstitutionId,
          "requestType": this.requestTypeId,
          "requestNotes": this.requestNotesId,
          "startPage": this.StartPage,
          "endPage": this.EndPage,
          "volumeNumber": this.VolumeNumber,
          "issue": this.Issue,
          "articleAuthor": this.ArticleAuthor,
          "articleTitle": this.ChapterTitle,
          "message": null,
          "errorMessage": null,
          "totalRecordsCount": "0",
          "pageNumber": 0,
          "pageSize": this.showentries,
          "totalPageCount": 0,
          "submitted": false,
          "showResults": false,
          "requestingInstitutions": [

          ],
          "requestTypes": [
          ],
          "deliveryLocations": [

          ],
          "searchResultRows": [

          ],
          "requestStatuses": [

          ],
          "institutionList": [

          ],
          "disableRequestingInstitution": false,
          "onChange": false,
          "institution": null,
          "showRequestErrorMsg": null,
          "requestingInstituionHidden": null,
          "itemBarcodeHidden": null,
          "disableSearchInstitution": false,
          "searchInstitutionHdn": null
        }

        this.requestService.createRequest(this.postData).subscribe(
          (res) => {
            this.createsubmit = true;
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            //Called when error
          })
      }
      //with edd end
    } else {
      //without edd strt
      this.spinner.hide();
      if (this.validateInputs()) {
        this.itemBarcodeErrorMessage = false;
        this.requestingInstitutionErrorMessage = false;
        this.patronBarcodeErrorMessage = false;
        this.deliveryLocationErrorMessage = false;
        this.postData = {
          "requestId": null,
          "patronBarcode": this.patronBarcodeId,
          "itemBarcode": this.itemBarcodeId,
          "status": null,
          "deliveryLocation": this.deliveryLocationId,
          "patronBarcodeInRequest": this.patronBarcodeId,
          "itemBarcodeInRequest": this.itemBarcodeId,
          "deliveryLocationInRequest": this.deliveryLocationId,
          "itemTitle": this.itemTitleId,
          "itemOwningInstitution": this.itemOwningInstitutionId,
          "patronEmailAddress": this.patronEmailId,
          "requestingInstitution": this.requestingInstitutionId,
          "requestType": this.requestTypeId,
          "requestNotes": this.requestNotesId,
          "startPage": this.StartPage,
          "endPage": this.EndPage,
          "volumeNumber": this.VolumeNumber,
          "issue": this.Issue,
          "articleAuthor": this.ArticleAuthor,
          "articleTitle": this.ChapterTitle,
          "message": null,
          "errorMessage": null,
          "totalRecordsCount": "0",
          "pageNumber": 0,
          "pageSize": this.showentries,
          "totalPageCount": 0,
          "submitted": false,
          "showResults": false,
          "requestingInstitutions": [

          ],
          "requestTypes": [
          ],
          "deliveryLocations": [

          ],
          "searchResultRows": [

          ],
          "requestStatuses": [

          ],
          "institutionList": [

          ],
          "disableRequestingInstitution": false,
          "onChange": false,
          "institution": null,
          "showRequestErrorMsg": null,
          "requestingInstituionHidden": null,
          "itemBarcodeHidden": null,
          "disableSearchInstitution": false,
          "searchInstitutionHdn": null
        }
        this.spinner.show();
        this.requestService.createRequest(this.postData).subscribe(
          (res) => {
            this.createResponse = res;
            if (this.createResponse['errorMessage'] != null) {
              this.errorMessage = this.createResponse['errorMessage'];
              this.createRequestError = true;
            } else {
              this.createsubmit = true;
              this.createRequestError = false;
            }
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            //Called when error
          })
      }
      //without edd end
      this.spinner.hide();
    }
  }
  validateInputs() {
    this.status_fields = true;
    if (this.itemBarcodeId == undefined || this.itemBarcodeId == '' || this.itemBarcodeNotFoundErrorMessage == true) {
      this.itemBarcodeErrorMessage = true;
      this.status_fields = false;
    } else {
      this.itemBarcodeErrorMessage = false;
    }
    if (this.requestingInstitutionId == undefined || this.requestingInstitutionId == '') {
      this.requestingInstitutionErrorMessage = true;
      this.status_fields = false;
    } else {
      this.requestingInstitutionErrorMessage = false;
    }
    if (this.patronBarcodeId == undefined || this.patronBarcodeId == '') {
      this.patronBarcodeErrorMessage = true;
      this.status_fields = false;
    } else {
      this.patronBarcodeErrorMessage = false;
    }
    if (this.deliveryLocationId == undefined || this.deliveryLocationId == '') {
      this.deliveryLocationErrorMessage = true;
      this.status_fields = false;
    } else {
      this.deliveryLocationErrorMessage = false;
    }
    if (this.requestTypeId == undefined || this.requestTypeId == '') {
      this.requestTypeErrorMessage = true;
      this.status_fields = false;
    } else {
      this.requestTypeErrorMessage = false;
    }
    return this.status_fields;
  }
  validateInputs_edd() {
    this.status_fields = true;
    if (this.itemBarcodeId == undefined || this.itemBarcodeId == '' || this.itemBarcodeNotFoundErrorMessage == true) {
      this.itemBarcodeErrorMessage = true;
      this.status_fields = false;
    } else {
      this.itemBarcodeErrorMessage = false;
    }
    if (this.requestingInstitutionId == undefined || this.requestingInstitutionId == '') {
      this.requestingInstitutionErrorMessage = true;
      this.status_fields = false;
    } else {
      this.requestingInstitutionErrorMessage = false;
    }
    if (this.patronBarcodeId == undefined || this.patronBarcodeId == '') {
      this.patronBarcodeErrorMessage = true;
      this.status_fields = false;
    } else {
      this.patronBarcodeErrorMessage = false;
    }
    if (this.patronEmailId == undefined || this.patronEmailId == '' || this.patronEmailIdErrorMessage == true) {
      this.EmailMandatoryErrorMessage = true;
      this.status_fields = false;
    } else {
      this.EmailMandatoryErrorMessage = false;
    }
    if (this.requestTypeId == undefined || this.requestTypeId == '') {
      this.requestTypeErrorMessage = true;
      this.status_fields = false;
    } else {
      this.requestTypeErrorMessage = false;
    }
    if (this.StartPage == undefined || this.StartPage == '') {
      this.startPageErrorMessage = true;
      this.status_fields = false;
    } else {
      this.startPageErrorMessage = false;
    }
    if (this.EndPage == undefined || this.EndPage == '') {
      this.endPageErrorMessage = true;
      this.status_fields = false;
    } else {
      this.endPageErrorMessage = false;
    }
    if (this.ChapterTitle == undefined || this.ChapterTitle == '') {
      this.articleTitleErrorMessage = true;
      this.status_fields = false;
    } else {
      this.articleTitleErrorMessage = false;
    }
    return this.status_fields;
  }
  resetDefaults() {
    this.deliveryLocVal = [];
    this.eddshow = false;
    this.initialload();
  }
  differentpatron() {
    this.deliveryLocVal = [];
    this.eddshow = false;
    this.createsubmit = false;
    this.initialload();
  }
  loadCreateRequestForSamePatron(patronId, reqInstId) {
    this.eddshow = false;
    this.createsubmit = false;
    this.requestService.loadCreateRequest().subscribe(
      (res) => {
        this.requestVal = res;
        this.requestTypeId = this.requestVal['requestType'];

        this.itemBarcodeId = '';
        this.requestingInstitutionId = reqInstId;
        this.itemTitleId = '';
        this.itemOwningInstitutionId = '';
        this.patronBarcodeId = patronId;
        this.patronEmailId = '';
        this.deliveryLocationId = '';
        this.requestNotesId = '';
        this.StartPage = '';
        this.EndPage = '';
        this.VolumeNumber = '';
        this.Issue = '';
        this.ArticleAuthor = '';
        this.ChapterTitle = '';
        this.deliveryLocVal = [];
      },
      (error) => {

      }

    );
  }

  goToSearchRequest(patronBarcode) {
    this.spinner.show();
    this.searchPatronBarcode = patronBarcode;
    this.requestStatus = '';
    this.requestService.loadSearchRequest().subscribe(
      (res) => {
        this.searchReqVal = res;
        this.postData = {
          "requestId": null,
          "patronBarcode": this.searchPatronBarcode,
          "itemBarcode": this.searchItemBarcode,
          "status": this.requestStatus,
          "deliveryLocation": null,
          "patronBarcodeInRequest": null,
          "itemBarcodeInRequest": null,
          "deliveryLocationInRequest": null,
          "itemTitle": null,
          "itemOwningInstitution": null,
          "patronEmailAddress": null,
          "requestingInstitution": this.searchInstitutionList,
          "requestType": null,
          "requestNotes": null,
          "startPage": null,
          "endPage": null,
          "volumeNumber": null,
          "issue": null,
          "articleAuthor": null,
          "articleTitle": null,
          "message": null,
          "errorMessage": null,
          "totalRecordsCount": "0",
          "pageNumber": 0,
          "pageSize": this.showentries,
          "totalPageCount": 0,
          "submitted": false,
          "showResults": false,
          "requestingInstitutions": [

          ],
          "requestTypes": [
          ],
          "deliveryLocations": [

          ],
          "searchResultRows": [

          ],
          "requestStatuses": [

          ],
          "institutionList": [

          ],
          "disableRequestingInstitution": false,
          "onChange": false,
          "institution": null,
          "showRequestErrorMsg": null,
          "requestingInstituionHidden": null,
          "itemBarcodeHidden": null,
          "disableSearchInstitution": false,
          "searchInstitutionHdn": null
        }

        this.requestService.goToSearchRequest(this.postData).subscribe(
          (res) => {
            this.searchReqresultFirst = true;
            this.searchBar = true;
            this.create_request = false;
            this.searchReqresult = true;
            this.searchreqResultVal = res;
            this.pagination();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            //Called when error
          })
        //search end

      },
      (error) => {
        this.spinner.hide();
      });
  }

  searchRequests() {
    this.spinner.show();
    if (this.requestStatus == '' || this.requestStatus == undefined) {
      if (this.searchItemBarcode || this.searchPatronBarcode) {
        //search api call start
        this.patronBarcodeSearchError = false;
        this.itemBarcodeSearchError = false;
        this.postData = {
          "requestId": null,
          "patronBarcode": this.searchPatronBarcode,
          "itemBarcode": this.searchItemBarcode,
          "status": this.requestStatus,
          "deliveryLocation": null,
          "patronBarcodeInRequest": null,
          "itemBarcodeInRequest": null,
          "deliveryLocationInRequest": null,
          "itemTitle": null,
          "itemOwningInstitution": null,
          "patronEmailAddress": null,
          "requestingInstitution": null,
          "requestType": null,
          "requestNotes": null,
          "startPage": null,
          "endPage": null,
          "volumeNumber": null,
          "issue": null,
          "articleAuthor": null,
          "articleTitle": null,
          "message": null,
          "errorMessage": null,
          "totalRecordsCount": "0",
          "pageNumber": 0,
          "pageSize": 10,
          "totalPageCount": 0,
          "submitted": false,
          "showResults": false,
          "requestingInstitutions": [

          ],
          "requestTypes": [
          ],
          "deliveryLocations": [

          ],
          "searchResultRows": [

          ],
          "requestStatuses": [

          ],
          "institutionList": [

          ],
          "disableRequestingInstitution": false,
          "onChange": false,
          "institution": this.searchInstitutionList,
          "showRequestErrorMsg": null,
          "requestingInstituionHidden": null,
          "itemBarcodeHidden": null,
          "disableSearchInstitution": false,
          "searchInstitutionHdn": null
        }

        this.requestService.searchRequests(this.postData).subscribe(
          (res) => {
            this.searchReqresultFirst = true;
            this.searchreqResultVal = res;
            this.pagination();
            if (this.searchreqResultVal['message'] != null) {
              this.messageNoSearchRecords = true;
              this.searchReqresult = false;
            } else {
              this.messageNoSearchRecords = false;
              this.searchReqresult = true;
            }
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
          })
      } else if ((this.searchItemBarcode == undefined || this.searchItemBarcode == '') && (this.searchItemBarcode == undefined || this.searchItemBarcode == '')) {

        this.patronBarcodeSearchError = true;
        this.itemBarcodeSearchError = true;
        this.spinner.hide();
      }
      else if (this.searchItemBarcode == undefined || this.searchItemBarcode == '') {
        this.patronBarcodeSearchError = true;
        this.spinner.hide();
      } else if (this.searchItemBarcode == undefined || this.searchItemBarcode == '') {
        this.itemBarcodeSearchError = true;
        this.spinner.hide();
      }
    } else {
      //search api call start
      this.patronBarcodeSearchError = false;
      this.itemBarcodeSearchError = false;
      this.postData = {
        "requestId": null,
        "patronBarcode": this.searchPatronBarcode,
        "itemBarcode": this.searchItemBarcode,
        "status": this.requestStatus,
        "deliveryLocation": null,
        "patronBarcodeInRequest": null,
        "itemBarcodeInRequest": null,
        "deliveryLocationInRequest": null,
        "itemTitle": null,
        "itemOwningInstitution": null,
        "patronEmailAddress": null,
        "requestingInstitution": this.searchInstitutionList,
        "requestType": null,
        "requestNotes": null,
        "startPage": null,
        "endPage": null,
        "volumeNumber": null,
        "issue": null,
        "articleAuthor": null,
        "articleTitle": null,
        "message": null,
        "errorMessage": null,
        "totalRecordsCount": "0",
        "pageNumber": 0,
        "pageSize": this.showentries,
        "totalPageCount": 0,
        "submitted": false,
        "showResults": false,
        "requestingInstitutions": [

        ],
        "requestTypes": [
        ],
        "deliveryLocations": [

        ],
        "searchResultRows": [

        ],
        "requestStatuses": [

        ],
        "institutionList": [

        ],
        "disableRequestingInstitution": false,
        "onChange": false,
        "institution": this.searchInstitutionList,
        "showRequestErrorMsg": null,
        "requestingInstituionHidden": null,
        "itemBarcodeHidden": null,
        "disableSearchInstitution": false,
        "searchInstitutionHdn": null
      }

      this.requestService.searchRequests(this.postData).subscribe(
        (res) => {
          this.searchReqresultFirst = true;
          this.searchreqResultVal = res;
          this.pagination();
          if (this.searchreqResultVal['message'] != null) {
            this.messageNoSearchRecords = true;
            this.searchReqresult = false;
          } else {
            this.messageNoSearchRecords = false;
            this.searchReqresult = true;
          }
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          //Called when error
        })
      //search api call end

    }
  }

  onChangeRequestStatus(statusVal) {
    if (statusVal == '' || statusVal == undefined) {
      this.noteActive = false;
      this.noteAll = true;
    } else if (statusVal == 'Active') {
      this.noteActive = true;
      this.noteAll = false;
      this.patronBarcodeSearchError = false;
      this.itemBarcodeSearchError = false;
    } else {
      this.noteActive = false;
      this.noteAll = false;
      this.patronBarcodeSearchError = false;
      this.itemBarcodeSearchError = false;
    }
  }

  reqNotemodal(notes) {
    this.requestNotesData = notes;
    $('#requestNotesModal').modal({ show: true });
  }

  resubmitReq(itembarcode, reqId) {
    this.resubmitReqConfirmItemBarcode = itembarcode;
    this.requestId = reqId;
    this.resubmitRequestConfirmBodyId = true;
    $('#resubmitRequestModal').modal({ show: true });
  }
  cancelRequest(reqId) {
    this.requestId = reqId;
    this.reqcancelmsg = '';
    $('#cancelConfirmationModal').modal({ show: true });
  }

  closeResubmitRequestItem() {
    $('#resubmitRequestModal').modal({ show: false });
  }

  resubmitRequestItem() {
    this.spinner.show();
    this.postData = {
      "requestId": this.requestId,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "patronBarcodeInRequest": null,
      "itemBarcodeInRequest": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": null,
      "requestType": null,
      "requestNotes": null,
      "startPage": null,
      "endPage": null,
      "volumeNumber": null,
      "issue": null,
      "articleAuthor": null,
      "articleTitle": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": 0,
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [

      ],
      "requestTypes": [
      ],
      "deliveryLocations": [

      ],
      "searchResultRows": [

      ],
      "requestStatuses": [

      ],
      "institutionList": [

      ],
      "disableRequestingInstitution": false,
      "onChange": false,
      "institution": null,
      "showRequestErrorMsg": null,
      "requestingInstituionHidden": this.resubmitReqConfirmItemBarcode,
      "itemBarcodeHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null
    }


    this.requestService.resubmitRequest(this.postData).subscribe(
      (res) => {
        this.resubmitRequestConfirmBodyId = false;
        this.resubmitResponse = res;
        this.resubmitResponseMessage = this.resubmitResponse['Message'];
        this.status = this.resubmitResponse['Status'];
        //this.searchRequests();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        //Called when error
      })

  }


  cancelRequestItem() {
    this.spinner.show();
    this.postData = {
      "requestId": this.requestId,
      "patronBarcode": null,
      "itemBarcode": null,
      "status": null,
      "deliveryLocation": null,
      "patronBarcodeInRequest": null,
      "itemBarcodeInRequest": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": null,
      "requestType": null,
      "requestNotes": null,
      "startPage": null,
      "endPage": null,
      "volumeNumber": null,
      "issue": null,
      "articleAuthor": null,
      "articleTitle": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": 0,
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [

      ],
      "requestTypes": [
      ],
      "deliveryLocations": [

      ],
      "searchResultRows": [

      ],
      "requestStatuses": [

      ],
      "institutionList": [

      ],
      "disableRequestingInstitution": false,
      "onChange": false,
      "institution": null,
      "showRequestErrorMsg": null,
      "requestingInstituionHidden": null,
      "itemBarcodeHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null
    }


    this.requestService.cancelRequest(this.postData).subscribe(
      (res) => {
        var msg = res['Message'];
        this.reqcancelmsg = msg;
        $("#cancelBtn").trigger("click");
        $('#cancelRequestModal').modal({ show: true });
        this.searchRequests();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        //Called when error
      })

  }
  firstCall() {
    this.showentries = this.searchreqResultVal['pageSize'];
    this.postData = {
      "requestId": null,
      "patronBarcode": this.searchPatronBarcode,
      "itemBarcode": this.searchItemBarcode,
      "status": this.requestStatus,
      "deliveryLocation": null,
      "patronBarcodeInRequest": null,
      "itemBarcodeInRequest": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": null,
      "requestType": null,
      "requestNotes": null,
      "startPage": null,
      "endPage": null,
      "volumeNumber": null,
      "issue": null,
      "articleAuthor": null,
      "articleTitle": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": this.searchreqResultVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [

      ],
      "requestTypes": [
      ],
      "deliveryLocations": [

      ],
      "searchResultRows": [

      ],
      "requestStatuses": [

      ],
      "institutionList": [

      ],
      "disableRequestingInstitution": false,
      "onChange": false,
      "institution": this.searchInstitutionList,
      "showRequestErrorMsg": null,
      "requestingInstituionHidden": null,
      "itemBarcodeHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null
    }
    this.requestService.firstCall(this.postData).subscribe(
      (res) => {
        this.searchreqResultVal = res;
        this.pagination();
      },
      (error) => {
        //Called when error
      })

  }
  previousCall() {
    this.showentries = this.searchreqResultVal['pageSize'];
    this.postData = {
      "requestId": null,
      "patronBarcode": this.searchPatronBarcode,
      "itemBarcode": this.searchItemBarcode,
      "status": this.requestStatus,
      "deliveryLocation": null,
      "patronBarcodeInRequest": null,
      "itemBarcodeInRequest": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": null,
      "requestType": null,
      "requestNotes": null,
      "startPage": null,
      "endPage": null,
      "volumeNumber": null,
      "issue": null,
      "articleAuthor": null,
      "articleTitle": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": this.searchreqResultVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [

      ],
      "requestTypes": [
      ],
      "deliveryLocations": [

      ],
      "searchResultRows": [

      ],
      "requestStatuses": [

      ],
      "institutionList": [

      ],
      "disableRequestingInstitution": false,
      "onChange": false,
      "institution": this.searchInstitutionList,
      "showRequestErrorMsg": null,
      "requestingInstituionHidden": null,
      "itemBarcodeHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null
    }
    this.requestService.previousCall(this.postData).subscribe(
      (res) => {
        this.searchreqResultVal = res;
        this.pagination();
      },
      (error) => {
        //Called when error
      })
  }
  nextCall() {
    this.showentries = this.searchreqResultVal['pageSize'];
    this.postData = {
      "requestId": null,
      "patronBarcode": this.searchPatronBarcode,
      "itemBarcode": this.searchItemBarcode,
      "status": this.requestStatus,
      "deliveryLocation": null,
      "patronBarcodeInRequest": null,
      "itemBarcodeInRequest": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": null,
      "requestType": null,
      "requestNotes": null,
      "startPage": null,
      "endPage": null,
      "volumeNumber": null,
      "issue": null,
      "articleAuthor": null,
      "articleTitle": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": this.searchreqResultVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [

      ],
      "requestTypes": [
      ],
      "deliveryLocations": [

      ],
      "searchResultRows": [

      ],
      "requestStatuses": [

      ],
      "institutionList": [

      ],
      "disableRequestingInstitution": false,
      "onChange": false,
      "institution": this.searchInstitutionList,
      "showRequestErrorMsg": null,
      "requestingInstituionHidden": null,
      "itemBarcodeHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null
    }
    this.requestService.nextCall(this.postData).subscribe(
      (res) => {
        this.searchreqResultVal = res;
        this.pagination();
      },
      (error) => {
        //Called when error
      })
  }
  lastCall() {
    this.showentries = this.searchreqResultVal['pageSize'];
    this.postData = {
      "requestId": null,
      "patronBarcode": this.searchPatronBarcode,
      "itemBarcode": this.searchItemBarcode,
      "status": this.requestStatus,
      "deliveryLocation": null,
      "patronBarcodeInRequest": null,
      "itemBarcodeInRequest": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": null,
      "requestType": null,
      "requestNotes": null,
      "startPage": null,
      "endPage": null,
      "volumeNumber": null,
      "issue": null,
      "articleAuthor": null,
      "articleTitle": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": "0",
      "pageNumber": this.searchreqResultVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": this.searchreqResultVal['totalPageCount'],
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [

      ],
      "requestTypes": [
      ],
      "deliveryLocations": [

      ],
      "searchResultRows": [

      ],
      "requestStatuses": [

      ],
      "institutionList": [

      ],
      "disableRequestingInstitution": false,
      "onChange": false,
      "institution": this.searchInstitutionList,
      "showRequestErrorMsg": null,
      "requestingInstituionHidden": null,
      "itemBarcodeHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null
    }
    this.requestService.lastCall(this.postData).subscribe(
      (res) => {
        this.searchreqResultVal = res;
        this.pagination();
      },
      (error) => {
        //Called when error
      })
  }

  onPageSizeChange(value) {
    this.showentries = value;
    this.postData = {
      "requestId": null,
      "patronBarcode": this.searchPatronBarcode,
      "itemBarcode": this.searchItemBarcode,
      "status": this.requestStatus,
      "deliveryLocation": null,
      "patronBarcodeInRequest": null,
      "itemBarcodeInRequest": null,
      "deliveryLocationInRequest": null,
      "itemTitle": null,
      "itemOwningInstitution": null,
      "patronEmailAddress": null,
      "requestingInstitution": null,
      "requestType": null,
      "requestNotes": null,
      "startPage": null,
      "endPage": null,
      "volumeNumber": null,
      "issue": null,
      "articleAuthor": null,
      "articleTitle": null,
      "message": null,
      "errorMessage": null,
      "totalRecordsCount": this.searchreqResultVal['totalRecordsCount'],
      "pageNumber": this.searchreqResultVal['pageNumber'],
      "pageSize": this.showentries,
      "totalPageCount": 0,
      "submitted": false,
      "showResults": false,
      "requestingInstitutions": [

      ],
      "requestTypes": [
      ],
      "deliveryLocations": [

      ],
      "searchResultRows": [

      ],
      "requestStatuses": [

      ],
      "institutionList": [

      ],
      "disableRequestingInstitution": false,
      "onChange": false,
      "institution": this.searchInstitutionList,
      "showRequestErrorMsg": null,
      "requestingInstituionHidden": null,
      "itemBarcodeHidden": null,
      "disableSearchInstitution": false,
      "searchInstitutionHdn": null
    }
    this.requestService.onRequestPageSizeChange(this.postData).subscribe(
      (res) => {
        this.searchreqResultVal = res;
        this.pagination();
      },
      (error) => {
        //Called when error
      })
  }
  pagination() {
    if (this.searchreqResultVal['pageNumber'] == 0 && (this.searchreqResultVal['totalPageCount'] - 1 > 0)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = false;
      this.lastbutton = false;
    } else if (this.searchreqResultVal['pageNumber'] == 0 && (this.searchreqResultVal['pageNumber'] == this.searchreqResultVal['totalPageCount'] - 1)) {
      this.firstbutton = true;
      this.previousbutton = true;
      this.nextbutton = true;
      this.lastbutton = true;
    }
    else if ((this.searchreqResultVal['pageNumber'] == this.searchreqResultVal['totalPageCount'] - 1) && this.searchreqResultVal['totalPageCount'] - 1 > 0) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = true;
      this.lastbutton = true;
    } else if ((this.searchreqResultVal['pageNumber'] < this.searchreqResultVal['totalPageCount'] - 1) && (this.searchreqResultVal['pageNumber'] != 0)) {
      this.firstbutton = false;
      this.previousbutton = false;
      this.nextbutton = false;
      this.lastbutton = false;
    }
  }
}
