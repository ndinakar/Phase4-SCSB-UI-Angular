import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CollectionService } from 'src/app/services/collection/collection.service';
import { CollectionForm } from 'src/app/model/CollectionForm';
import { TreeNode } from 'primeng/api';
import { identifierModuleUrl } from '@angular/compiler';
declare var $: any;

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collectionForm: FormGroup;
  collectionVal: TreeNode[];
  openmarcVal: TreeNode[];
  collectionupdateVal: TreeNode[];
  crossinstitutionVal: TreeNode[];
  cols: any[];
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
  collectionUpdateWarningMessage =  false;
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
  bibId :string;
  customerCode: string;
  constructor(private formBuilder: FormBuilder, private collectionService: CollectionService) { }

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
  displyRecords() {
    console.log("vall", this.barcodeFieldName);
    this.barerrmsg = '';
    this.showresultdiv = true;
    if (this.barcodeFieldName != null && this.barcodeFieldName != undefined && this.barcodeFieldName != '') {
      console.log("nbdfvsdv")
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
          this.collectionVal = res;
          if (this.collectionVal['barcodesNotFoundErrorMessage'] == null) {

            this.resultdiv = true
            this.norecord = false;
            this.barcodesNotFoundErrorMessageId = false;
          } else {
            this.barerrmsg = this.collectionVal['barcodesNotFoundErrorMessage'];
            this.resultdiv = false;
            this.norecord = false;
            this.barcodesNotFoundErrorMessageId = true;
          }
        },
        (error) => {
          //Called when error
        }

      );
    } else {
      console.log("nb")
      this.norecord = true;
      this.resultdiv = false;
      this.barcodesNotFoundErrorMessageId = false;
    }

  }

  modaltitle(bibid) {
    this.CGDselect = '';
    this.DeliveryLocation = '';
    this.collectionUpdateMessage = false;
    this.CGDChangeNotes = '';
    this.DeaccessionNotes = '';
    console.log("modalval", bibid)
    // $('#collectionUpdateModal').html();
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
      "barcode": null,
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
      //res => this.openmarcVal=res
      (res) => {
        this.openmarcVal = res;
        // console.log("openmarc",this.openmarcVal['bibDataFields'])
        this.CGDselect = this.openmarcVal['collectionGroupDesignation'];
        this.deaccessionType = this.openmarcVal['deaccessionType'];
        this.itemBarcodenew = this.openmarcVal['itemBarcodes'];
        console.log("openmarc", this.openmarcVal['collectionGroupDesignation'])

        //cross institute
        this.postData =
        {
          "itemBarcodes": this.itemBarcodenew,
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
          "barcode": null,
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
          "message": 'Update CGD',
          "collectionAction": null,
          "allowEdit": false,
          "username": null
        }
        this.collectionService.checkCrossInstitutionBorrowed(this.postData).subscribe(
          (res) => {
            this.crossinstitutionVal = res;
          },
          (error) => {
            //Called when error
          }

        );
        //cross institue tend
        $('#collection-result-inner').modal({ show: true });


      },
      (error) => {
        //Called when error
      }

    );
    if(this.crossinstitutionVal['warningMessage'] != null && this.crossinstitutionVal['errorMessage'] != null){
      this.collectionUpdateErrorMessage = true;
      this.collectionUpdateWarningMessage = true;
    }else if(this.crossinstitutionVal['warningMessage'] != null){
      this.collectionUpdateErrorMessage = false;
      this.collectionUpdateWarningMessage = true;
    } else if(this.crossinstitutionVal['errorMessage'] != null){
      this.collectionUpdateErrorMessage = true;
      this.collectionUpdateWarningMessage = false;
    }else{
      this.collectionUpdateErrorMessage = false;
      this.collectionUpdateWarningMessage = false;
    }

  }

  editCgdcontrol() {
    //cross institute
    this.itemBarcodenew = this.openmarcVal['itemBarcodes'];
    this.bibId = this.openmarcVal['bibId'];
    this.postData =
    {
      "itemBarcodes": this.itemBarcodenew,
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
      "itemId": null,
      "availability": null,
      "barcode": null,
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
      "message": 'Update CGD',
      "collectionAction": null,
      "allowEdit": false,
      "username": null
    }
    this.collectionService.checkCrossInstitutionBorrowed(this.postData).subscribe(
       (res) => {
         this.crossinstitutionVal=res;
       },
      (error) => {
         //Called when error
      }

       );
    //cross institue tend
    if(this.crossinstitutionVal['warningMessage'] != null && this.crossinstitutionVal['errorMessage'] != null){
      this.collectionUpdateErrorMessage = true;
      this.collectionUpdateWarningMessage = true;
    }else if(this.crossinstitutionVal['warningMessage'] != null){
      this.collectionUpdateErrorMessage = false;
      this.collectionUpdateWarningMessage = true;
    } else if(this.crossinstitutionVal['errorMessage'] != null){
      this.collectionUpdateErrorMessage = true;
      this.collectionUpdateWarningMessage = false;
    }else{
      this.collectionUpdateErrorMessage = false;
      this.collectionUpdateWarningMessage = false;
    }
    this.editCDGsection = true;
    this.Deaccessionsection = false;
  }

  deaccessioncontrol() {

    //cross institute
    this.itemBarcodenew = this.openmarcVal['itemBarcodes'];
    this.bibId = this.openmarcVal['bibId'];
    this.customerCode = this.openmarcVal['customerCode'];
    this.postData =
    {
      "itemBarcodes": this.itemBarcodenew,
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
      "itemId": null,
      "availability": null,
      "barcode": null,
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
      "message": 'Deaccession',
      "collectionAction": null,
      "allowEdit": false,
      "username": null
    }
    this.collectionService.checkCrossInstitutionBorrowed(this.postData).subscribe(
       (res) => {
         this.crossinstitutionVal=res;
       },
      (error) => {
         //Called when error
      }

       );
    //cross institue tend
    if(this.crossinstitutionVal['warningMessage'] != null && this.crossinstitutionVal['errorMessage'] != null){
      this.collectionUpdateErrorMessage = true;
      this.collectionUpdateWarningMessage = true;
    }else if(this.crossinstitutionVal['warningMessage'] != null){
      this.collectionUpdateErrorMessage = false;
      this.collectionUpdateWarningMessage = true;
    } else if(this.crossinstitutionVal['errorMessage'] != null){
      this.collectionUpdateErrorMessage = true;
      this.collectionUpdateWarningMessage = false;
    }else{
      this.collectionUpdateErrorMessage = false;
      this.collectionUpdateWarningMessage = false;
    }
    this.editCDGsection = false;
    this.Deaccessionsection = true;
  }

  CGDChangeNotesFunc(val) {
    console.log("vall", val)
    var CGDChangeNotes = $('#CGDChangeNotes').val();
    var cgdNoteLength = CGDChangeNotes.length;
    console.log("ll", cgdNoteLength)
    var len = val.length;
    if (len > 2000) {
      val = val.substring(0, 2000);
    } else {
      $('#cgdNotesRemainingCharacters').text(2000 - len);
    }

  }

  DeaccessionNotesFunc(val) {
    console.log("vall1", val)
    var DeaccessionNotes = $('#DeaccessionNotes').val();
    var deaNoteLength = DeaccessionNotes.length;
    console.log("ll", deaNoteLength)
    var len = val.length;
    if (len > 2000) {
      val = val.substring(0, 2000);
    } else {
      $('#deaccessionNotesRemainingCharacters').text(2000 - len);
    }

  }

  //save cgd start
  saveCGD(bibid, cgdold) {
    if (this.CGDselect != '' && this.CGDChangeNotes != '' && this.CGDselect != undefined && this.CGDChangeNotes != undefined) {
      this.cgdErrorMessage = false;
      this.cgdNotesErrorMessage = false;
      this.newCGDReadOnly = true;
      this.CGDNoteReadOnly = true;
      this.postData = {
        "itemBarcodes": this.itemBarcodenew,
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
        "barcode": null,
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
        // (res) => this.collectionupdateVal=res
        (res) => {
          this.collectionupdateVal = res;
          console.log("updatesave", this.collectionupdateVal['newCollectionGroupDesignation'])
          this.newCGD = this.collectionupdateVal['newCollectionGroupDesignation'];
          this.newCGDnote = this.collectionupdateVal['cgdChangeNotes'];
          this.collectionmsg = this.collectionupdateVal['message'];
          this.collectionUpdateMessage = true;
          this.Deaccessionsection = false;
        },
        (error) => {
          //Called when error
        }

      );

    } else {
      console.log("111", this.CGDselect)
      console.log("22", this.CGDChangeNotes)
      if (this.CGDselect == '' || this.CGDselect == undefined) {
        this.cgdErrorMessage = true;
      } else if (this.CGDChangeNotes == undefined || this.CGDChangeNotes == '') {
        this.cgdNotesErrorMessage = true;
      }
      console.log("err")
    }
  }
  //save cgd end

  //save deacc start
  saveDeaccession(bibid, deacctype) {
    if (this.deaccessionType != '' && this.DeliveryLocation != '' && this.DeaccessionNotes != '' && this.deaccessionType != undefined && this.DeliveryLocation != undefined && this.DeaccessionNotes != undefined) {
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
        "barcode": null,
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
        // (res) => this.collectionupdateVal=res
        (res) => {
          this.collectionupdateVal = res;
          console.log("updatesave", this.collectionupdateVal['deaccessionType']);
          this.newdeaccessionType = this.collectionupdateVal['deaccessionType'];
          this.newDeliveryLocation = this.collectionupdateVal['deliveryLocation'];
          this.newdeaccessionnote = this.collectionupdateVal['deaccessionNotes'];

          this.collectionmsg = this.collectionupdateVal['message'];
          this.collectionUpdateMessage = true;
          this.editCDGsection = false;
        },
        (error) => {
          //Called when error
        }

      );

    } else {
      console.log("111", this.deaccessionType)
      console.log("22", this.CGDChangeNotes)
      if (this.deaccessionType == '' || this.deaccessionType == undefined) {

      } else if (this.DeliveryLocation == undefined || this.DeliveryLocation == '') {
        this.locationErrorMessage = true;
      }
      else if (this.DeaccessionNotes == undefined || this.DeaccessionNotes == '') {
        this.deaccessionNotesErrorMessage = true;
      }
      console.log("err")
    }
  }
  //save deacc end

}
