import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { TreeNode } from 'primeng/api';

import { CollectionService } from 'src/app/services/collection/collection.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

declare var $: any;

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  deliveryLocationDisable = false;
  showStatus = false;
  showStar = false;
  statusLocation = false;
  collectionForm: FormGroup;
  collectionVal: TreeNode[];
  openmarcVal: TreeNode[];
  crossinstitutionVal: TreeNode[];
  cols: any[];
  itemId: number;
  showresultdiv = false;
  errorDiv = false;
  editCDGsection = true;
  Deaccessionsection = false;
  cgdErrorMessage = false;
  cgdNotesErrorMessage = false;
  locationErrorMessage = false;
  deaccessionNotesErrorMessage = false;
  newCGDReadOnly = false;
  CGDNoteReadOnly = false;
  collectionUpdateMessage = false;
  collectionUpdateErrorMessage = false;
  collectionUpdateWarningMessage = false;
  barcodeFieldName: string;
  CGDChangeNotes: string;
  DeaccessionNotes: string;
  CGDselect: string;
  newCGD: string;
  newCGDnote: string;
  collectionmsg: string;
  deaccessionType: string;
  DeliveryLocation: string;

  newdeaccessionType: string;
  newDeliveryLocation: string;
  newdeaccessionnote: string;
  itemBarcodenew: string;
  norecord = false;
  barcodesNotFoundErrorMessageId = false;
  resultdiv = false;
  barerrmsg: string;
  bibId: string;
  customerCode: string;
  message: string;
  warningMessage: string;
  errorMessage: string;
  radioSwitchEditCGD: boolean;
  radioSwitchDeaccession: boolean;
  constructor(private formBuilder: FormBuilder, private collectionService: CollectionService, private spinner: NgxSpinnerService, private dashBoard: DashboardComponent) { }

  ngOnInit(): void {
    this.collectionForm = this.formBuilder.group({
      barcodeFieldName: ['']
    });
  }


  postData = {
    "itemBarcodes": "",
    "showResults": false,
    "selectAll": false,
    "errorMessage": null,
    "barcodesNotFoundErrorMessage": null,
    "ignoredBarcodesErrorMessage": null,
    "searchResultRows": [],
    "showModal": false,
    "bibId": null,
    "title": null,
    "author": null,
    "publisher": null,
    "publishedDate": null,
    "owningInstitution": null,
    "callNumber": null,
    "leaderMaterialType": null,
    "tag000": null,
    "controlNumber001": null,
    "controlNumber005": null,
    "controlNumber008": null,
    "content": null,
    "bibDataFields": [],
    "BibliographicMarcForm.errorMessage": null,
    "warningMessage": null,
    "itemId": null,
    "availability": null,
    "barcode": null,
    "locationCode": null,
    "useRestriction": null,
    "monographCollectionGroupDesignation": null,
    "collectionGroupDesignation": null,
    "newCollectionGroupDesignation": null,
    "cgdChangeNotes": null,
    "customerCode": null,
    "deaccessionType": null,
    "deaccessionNotes": null,
    "deliveryLocations": [],
    "deliveryLocation": null,
    "shared": false,
    "submitted": false,
    "message": null,
    "collectionAction": null,
    "allowEdit": false,
    "username": null
  }

  clearsearch() {
    this.barcodeFieldName = '';
    this.showresultdiv = false;
  }
  displayRecords() {
    this.spinner.show();
    this.barerrmsg = '';
    this.showresultdiv = true;
    if (this.barcodeFieldName != null && this.barcodeFieldName != undefined && this.barcodeFieldName != '') {

      this.norecord = false;

      this.postData = {
        "itemBarcodes": this.barcodeFieldName,
        "showResults": false,
        "selectAll": false,
        "errorMessage": null,
        "barcodesNotFoundErrorMessage": null,
        "ignoredBarcodesErrorMessage": null,
        "searchResultRows": [],
        "showModal": false,
        "bibId": null,
        "title": null,
        "author": null,
        "publisher": null,
        "publishedDate": null,
        "owningInstitution": null,
        "callNumber": null,
        "leaderMaterialType": null,
        "tag000": null,
        "controlNumber001": null,
        "controlNumber005": null,
        "controlNumber008": null,
        "content": null,
        "bibDataFields": [],
        "BibliographicMarcForm.errorMessage": null,
        "warningMessage": null,
        "itemId": null,
        "availability": null,
        "barcode": null,
        "locationCode": null,
        "useRestriction": null,
        "monographCollectionGroupDesignation": null,
        "collectionGroupDesignation": null,
        "newCollectionGroupDesignation": null,
        "cgdChangeNotes": null,
        "customerCode": null,
        "deaccessionType": null,
        "deaccessionNotes": null,
        "deliveryLocations": [],
        "deliveryLocation": null,
        "shared": false,
        "submitted": false,
        "message": null,
        "collectionAction": null,
        "allowEdit": false,
        "username": null
      }
      this.collectionService.displyRecords(this.postData).subscribe(
        (res) => {
          this.spinner.hide();
          this.collectionVal = res;
          this.validateDisplayRecords();
        },
        (error) => {
          this.spinner.hide();
        }

      );
    } else {
      this.norecord = true;
      this.resultdiv = false;
      this.barcodesNotFoundErrorMessageId = false;
      this.spinner.hide();
    }

  }

  openMarcView(bibid, barcode, itemId) {
    this.dashBoard.validate('collection');
    this.spinner.show();
    this.radioSwitchDeaccession = false;
    this.CGDselect = '';
    this.DeliveryLocation = '';
    this.collectionUpdateMessage = false;
    this.CGDChangeNotes = '';
    this.DeaccessionNotes = '';
    this.postData = {
      "itemBarcodes": barcode,
      "showResults": false,
      "selectAll": false,
      "errorMessage": null,
      "barcodesNotFoundErrorMessage": null,
      "ignoredBarcodesErrorMessage": null,
      "searchResultRows": [],
      "showModal": false,
      "bibId": bibid,
      "title": null,
      "author": null,
      "publisher": null,
      "publishedDate": null,
      "owningInstitution": null,
      "callNumber": null,
      "leaderMaterialType": null,
      "tag000": null,
      "controlNumber001": null,
      "controlNumber005": null,
      "controlNumber008": null,
      "content": null,
      "bibDataFields": [],
      "BibliographicMarcForm.errorMessage": null,
      "warningMessage": null,
      "itemId": itemId,
      "availability": null,
      "barcode": barcode,
      "locationCode": null,
      "useRestriction": null,
      "monographCollectionGroupDesignation": null,
      "collectionGroupDesignation": "Shared",
      "newCollectionGroupDesignation": "",
      "cgdChangeNotes": "test",
      "customerCode": null,
      "deaccessionType": null,
      "deaccessionNotes": null,
      "deliveryLocations": [],
      "deliveryLocation": null,
      "shared": false,
      "submitted": false,
      "message": null,
      "collectionAction": null,
      "allowEdit": false,
      "username": null
    }
    this.collectionService.openMarcView(this.postData).subscribe(
      (res) => {
        this.openmarcVal = res;
        this.CGDselect = this.openmarcVal['collectionGroupDesignation'];
        this.deaccessionType = this.openmarcVal['deaccessionType'];
        this.itemBarcodenew = this.openmarcVal['itemBarcodes'];
        this.radioSwitchEditCGD = true;
        this.spinner.hide();
        if (this.CGDselect == 'Shared') {
          this.showStar = true;
        } else {
          this.showStar = false;
        }
        this.postData =
        {
          "itemBarcodes": null,
          "showResults": false,
          "selectAll": false,
          "errorMessage": null,
          "barcodesNotFoundErrorMessage": null,
          "ignoredBarcodesErrorMessage": null,
          "searchResultRows": [],
          "showModal": false,
          "bibId": bibid,
          "title": null,
          "author": null,
          "publisher": null,
          "publishedDate": null,
          "owningInstitution": null,
          "callNumber": null,
          "leaderMaterialType": null,
          "tag000": null,
          "controlNumber001": null,
          "controlNumber005": null,
          "controlNumber008": null,
          "content": null,
          "bibDataFields": [],
          "BibliographicMarcForm.errorMessage": null,
          "warningMessage": null,
          "itemId": itemId,
          "availability": null,
          "barcode": this.itemBarcodenew,
          "locationCode": null,
          "useRestriction": null,
          "monographCollectionGroupDesignation": null,
          "collectionGroupDesignation": this.CGDselect,
          "newCollectionGroupDesignation": null,
          "cgdChangeNotes": "test",
          "customerCode": null,
          "deaccessionType": this.deaccessionType,
          "deaccessionNotes": null,
          "deliveryLocations": [],
          "deliveryLocation": null,
          "shared": false,
          "submitted": false,
          "message": null,
          "collectionAction": 'Update CGD',
          "allowEdit": false,
          "username": null
        }
        this.collectionService.checkCrossInstitutionBorrowed(this.postData).subscribe(
          (res) => {
            this.crossinstitutionVal = res;
            $('#collection-result-inner').modal({ show: true });
            this.validateResponse();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
          });
      },
      (error) => {
        this.spinner.hide();
      }

    );
    this.editCDGsection = true;
    this.Deaccessionsection = false;

  }

  editCgdcontrol() {
    this.deaccessionType = '';
    this.DeliveryLocation = '';
    this.radioSwitchDeaccession = false;
    this.radioSwitchEditCGD = true;
    this.itemBarcodenew = this.openmarcVal['itemBarcodes'];
    this.bibId = this.openmarcVal['bibId'];
    this.itemId = this.openmarcVal['itemId']
    this.postData =
    {
      "itemBarcodes": "",
      "showResults": false,
      "selectAll": false,
      "errorMessage": null,
      "barcodesNotFoundErrorMessage": null,
      "ignoredBarcodesErrorMessage": null,
      "searchResultRows": [],
      "showModal": false,
      "bibId": this.bibId,
      "title": null,
      "author": null,
      "publisher": null,
      "publishedDate": null,
      "owningInstitution": null,
      "callNumber": null,
      "leaderMaterialType": null,
      "tag000": null,
      "controlNumber001": null,
      "controlNumber005": null,
      "controlNumber008": null,
      "content": null,
      "bibDataFields": [],
      "BibliographicMarcForm.errorMessage": null,
      "warningMessage": null,
      "itemId": this.itemId,
      "availability": null,
      "barcode": this.itemBarcodenew,
      "locationCode": null,
      "useRestriction": null,
      "monographCollectionGroupDesignation": null,
      "collectionGroupDesignation": "Shared",
      "newCollectionGroupDesignation": "",
      "cgdChangeNotes": "test",
      "customerCode": null,
      "deaccessionType": null,
      "deaccessionNotes": null,
      "deliveryLocations": [],
      "deliveryLocation": null,
      "shared": false,
      "submitted": false,
      "message": null,
      "collectionAction": 'Update CGD',
      "allowEdit": false,
      "username": null
    }
    this.spinner.show();
    this.collectionService.checkCrossInstitutionBorrowed(this.postData).subscribe(
      (res) => {
        this.spinner.hide();
        this.crossinstitutionVal = res;
        this.validateResponse();
      },
      (error) => {
        this.spinner.hide();
      });
    //cross institue tend

    this.editCDGsection = true;
    this.Deaccessionsection = false;
  }

  deaccessioncontrol() {
    if (this.openmarcVal['availability'] == 'Not Available' || this.openmarcVal['availability'] == 'Out') {
      this.deliveryLocationDisable = true;
    } else {
      this.deliveryLocationDisable = false;
    }
    this.radioSwitchDeaccession = true;
    this.radioSwitchEditCGD = false;
    this.itemBarcodenew = this.openmarcVal['itemBarcodes'];
    this.bibId = this.openmarcVal['bibId'];
    this.customerCode = this.openmarcVal['customerCode'];
    this.itemId = this.openmarcVal['itemId']
    this.spinner.show();
    this.postData =
    {
      "itemBarcodes": null,
      "showResults": false,
      "selectAll": false,
      "errorMessage": null,
      "barcodesNotFoundErrorMessage": null,
      "ignoredBarcodesErrorMessage": null,
      "searchResultRows": [],
      "showModal": false,
      "bibId": this.bibId,
      "title": null,
      "author": null,
      "publisher": null,
      "publishedDate": null,
      "owningInstitution": null,
      "callNumber": null,
      "leaderMaterialType": null,
      "tag000": null,
      "controlNumber001": null,
      "controlNumber005": null,
      "controlNumber008": null,
      "content": null,
      "bibDataFields": [],
      "BibliographicMarcForm.errorMessage": null,
      "warningMessage": null,
      "itemId": this.itemId,
      "availability": null,
      "barcode": this.itemBarcodenew,
      "locationCode": null,
      "useRestriction": null,
      "monographCollectionGroupDesignation": null,
      "collectionGroupDesignation": null,
      "newCollectionGroupDesignation": null,
      "cgdChangeNotes": null,
      "customerCode": this.customerCode,
      "deaccessionType": null,
      "deaccessionNotes": null,
      "deliveryLocations": [],
      "deliveryLocation": null,
      "shared": false,
      "submitted": false,
      "message": null,
      "collectionAction": 'Deaccession',
      "allowEdit": false,
      "username": null
    }
    this.collectionService.checkCrossInstitutionBorrowed(this.postData).subscribe(
      (res) => {
        this.crossinstitutionVal = res;
        this.editCDGsection = false;
        this.Deaccessionsection = true;
        if (this.crossinstitutionVal['submitted'] != false) {
          this.deaccessionType = '';
          this.DeliveryLocation = '';
          this.deliveryLocationDisable = true;
        }
        this.validateResponse();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      });
  }

  CGDChangeNotesFunc(val) {
    var CGDChangeNotes = $('#CGDChangeNotes').val();
    var cgdNoteLength = CGDChangeNotes.length;
    var len = val.length;
    if (len > 2000) {
      val = val.substring(0, 2000);
    } else {
      $('#cgdNotesRemainingCharacters').text(2000 - len);
    }
  }
  DeaccessionNotesFunc(val) {
    var DeaccessionNotes = $('#DeaccessionNotes').val();
    var len = val.length;
    if (len > 2000) {
      val = val.substring(0, 2000);
    } else {
      $('#deaccessionNotesRemainingCharacters').text(2000 - len);
    }
  }
  //save cgd start
  saveCGD(bibid, cgdold) {
    if (!this.validateInputs(cgdold)) {
      this.spinner.show();
      this.postData = {
        "itemBarcodes": "",
        "showResults": false,
        "selectAll": false,
        "errorMessage": null,
        "barcodesNotFoundErrorMessage": null,
        "ignoredBarcodesErrorMessage": null,
        "searchResultRows": [],
        "showModal": false,
        "bibId": bibid,
        "title": null,
        "author": null,
        "publisher": null,
        "publishedDate": null,
        "owningInstitution": null,
        "callNumber": null,
        "leaderMaterialType": null,
        "tag000": null,
        "controlNumber001": null,
        "controlNumber005": null,
        "controlNumber008": null,
        "content": null,
        "bibDataFields": [],
        "BibliographicMarcForm.errorMessage": null,
        "warningMessage": null,
        "itemId": null,
        "availability": null,
        "barcode": this.itemBarcodenew,
        "locationCode": null,
        "useRestriction": null,
        "monographCollectionGroupDesignation": null,
        "collectionGroupDesignation": cgdold,
        "newCollectionGroupDesignation": this.CGDselect,
        "cgdChangeNotes": this.CGDChangeNotes,
        "customerCode": null,
        "deaccessionType": null,
        "deaccessionNotes": null,
        "deliveryLocations": [],
        "deliveryLocation": null,
        "shared": false,
        "submitted": false,
        "message": null,
        "collectionAction": "Update CGD",
        "allowEdit": false,
        "username": null
      }

      this.collectionService.updateCollection(this.postData).subscribe(
        (res) => {
          this.newCGDReadOnly = true;
          this.CGDNoteReadOnly = true;
          this.crossinstitutionVal = res;
          this.newCGD = this.crossinstitutionVal['newCollectionGroupDesignation'];
          this.newCGDnote = this.crossinstitutionVal['cgdChangeNotes'];
          this.collectionmsg = this.crossinstitutionVal['message'];
          this.collectionUpdateMessage = true;
          this.Deaccessionsection = false;
          this.validateResponse();
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
        }
      );
    }
  }
  validateInputs(cgdold) {
    this.showStatus = false;
    if (this.CGDselect != '' && this.CGDselect != undefined) {
      this.cgdErrorMessage = false;
    }
    if (this.CGDChangeNotes != undefined && this.CGDChangeNotes != '') {
      this.cgdNotesErrorMessage = false;
    }
    if (this.CGDselect == '' || this.CGDselect == undefined) {
      this.cgdErrorMessage = true;
      this.showStatus = true;
    }
    if (this.CGDChangeNotes == undefined || this.CGDChangeNotes == '') {
      if (cgdold == 'Shared') {
        this.cgdNotesErrorMessage = true;
        this.showStatus = true;
      } else {
        this.cgdNotesErrorMessage = false;
      }
    }
    if (this.CGDselect == cgdold) {
      this.showStatus = true;
      this.cgdErrorMessage = true;
    }
    return this.showStatus;
  }

  //save deacc start
  saveDeaccession(bibid, deacctype, itemBarcode) {
    this.statusLocation = false;
    if (this.openmarcVal['availability'] == 'Not Available' || this.openmarcVal['availability'] == 'Out') {
      this.locationErrorMessage = false;
      this.statusLocation = true;
    } else if (this.DeliveryLocation != '' && this.DeliveryLocation != undefined) {
      this.locationErrorMessage = false;
      this.statusLocation = true;
    } else {
      this.locationErrorMessage = true;
      this.statusLocation = false;
    }

    this.spinner.show();
    if (this.deaccessionType != '' && this.DeaccessionNotes != '' && this.deaccessionType != undefined && this.DeaccessionNotes != undefined && this.statusLocation) {

      this.locationErrorMessage = false;
      this.deaccessionNotesErrorMessage = false;
      this.postData = {
        "itemBarcodes": "",
        "showResults": false,
        "selectAll": false,
        "errorMessage": null,
        "barcodesNotFoundErrorMessage": null,
        "ignoredBarcodesErrorMessage": null,
        "searchResultRows": [],
        "showModal": false,
        "bibId": bibid,
        "title": null,
        "author": null,
        "publisher": null,
        "publishedDate": null,
        "owningInstitution": null,
        "callNumber": null,
        "leaderMaterialType": null,
        "tag000": null,
        "controlNumber001": null,
        "controlNumber005": null,
        "controlNumber008": null,
        "content": null,
        "bibDataFields": [],
        "BibliographicMarcForm.errorMessage": null,
        "warningMessage": null,
        "itemId": null,
        "availability": null,
        "barcode": itemBarcode,
        "locationCode": null,
        "useRestriction": null,
        "monographCollectionGroupDesignation": null,
        "collectionGroupDesignation": "Shared",
        "newCollectionGroupDesignation": "",
        "cgdChangeNotes": "test",
        "customerCode": null,
        "deaccessionType": deacctype,
        "deaccessionNotes": this.DeaccessionNotes,
        "deliveryLocations": [],
        "deliveryLocation": this.DeliveryLocation,
        "shared": false,
        "submitted": false,
        "message": null,
        "collectionAction": "Deaccession",
        "allowEdit": false,
        "username": null
      }
      this.collectionService.updateCollection(this.postData).subscribe(
        (res) => {
          this.crossinstitutionVal = res;
          this.newdeaccessionType = this.crossinstitutionVal['deaccessionType'];
          this.newDeliveryLocation = this.crossinstitutionVal['deliveryLocation'];
          this.newdeaccessionnote = this.crossinstitutionVal['deaccessionNotes'];
          this.collectionmsg = this.crossinstitutionVal['message'];
          this.collectionUpdateMessage = true;
          this.editCDGsection = false;
          this.validateResponse();
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
        });

    } else if (this.DeaccessionNotes == undefined || this.DeaccessionNotes == '') {
      this.deaccessionNotesErrorMessage = true;
    }
    this.spinner.hide();
  }
  validateResponse() {
    this.message = this.crossinstitutionVal['message'];
    this.warningMessage = this.crossinstitutionVal['warningMessage'];
    this.errorMessage = this.crossinstitutionVal['errorMessage'];
    if (this.crossinstitutionVal['warningMessage'] != null) {
      this.collectionUpdateErrorMessage = false;
      this.collectionUpdateWarningMessage = true;
      this.collectionUpdateMessage = false;
    } else if (this.crossinstitutionVal['errorMessage'] != null) {
      this.collectionUpdateErrorMessage = true;
      this.collectionUpdateWarningMessage = false;
      this.collectionUpdateMessage = false;
    } else if (this.crossinstitutionVal['message'] != null) {
      this.collectionUpdateMessage = true;
      this.collectionUpdateWarningMessage = false;
      this.collectionUpdateErrorMessage = false;
    } else {
      this.collectionUpdateMessage = false;
      this.collectionUpdateWarningMessage = false;
      this.collectionUpdateErrorMessage = false;
    }
  }
  //save deacc end
  validateDisplayRecords() {
    this.barerrmsg = this.collectionVal['barcodesNotFoundErrorMessage'];
    if (this.collectionVal['barcodesNotFoundErrorMessage'] == null && (this.collectionVal['searchResultRows']) != 0) {
      this.resultdiv = true
      this.norecord = false;
      this.barcodesNotFoundErrorMessageId = false;
    } else if (this.collectionVal['barcodesNotFoundErrorMessage'] != null && (this.collectionVal['searchResultRows']) == 0) {
      this.norecord = false;
      this.resultdiv = false;
      this.barcodesNotFoundErrorMessageId = true;
    } else if (this.collectionVal['barcodesNotFoundErrorMessage'] != null && (this.collectionVal['searchResultRows']) != 0) {
      this.norecord = false;
      this.resultdiv = true;
      this.barcodesNotFoundErrorMessageId = true;
    }
  }
}
