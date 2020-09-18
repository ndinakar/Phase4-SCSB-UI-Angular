import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CollectionService } from 'src/app/services/collection/collection.service';
import { CollectionForm } from 'src/app/model/CollectionForm';
import { TreeNode } from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collectionForm: FormGroup;
  collectionVal: TreeNode[];
  cols: any[];
  showresultdiv = false;
  errorDiv =  false;
  editCDGsection=true;
  Deaccessionsection=false;
  cgdErrorMessage=false;
  cgdNotesErrorMessage=false;
  locationErrorMessage=false;
  deaccessionNotesErrorMessage=false;
  
  barcodeFieldName:string;
  CGDChangeNotes:string;
  DeaccessionNotes:string;
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
  
  clearsearch(){
    this.barcodeFieldName='';
    this.showresultdiv = false;
  }
  displyRecords(){
    console.log("vall",this.barcodeFieldName)
    this.showresultdiv = true;
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
    this.collectionService.displyRecords(this.postData).subscribe(res => this.collectionVal=res);
   
   
  }

  modaltitle(value){
    console.log("modalval",value)
    // $('#collectionUpdateModal').html();
    $('#collection-result-inner').modal({ show: true });
  }

  editCgdcontrol(){
    this.editCDGsection=true;
    this.Deaccessionsection=false;
  }

  deaccessioncontrol(){
    this.editCDGsection=false;
    this.Deaccessionsection=true;
  }

  CGDChangeNotesFunc(val){
    console.log("vall",val)
    var CGDChangeNotes = $('#CGDChangeNotes').val();
    var cgdNoteLength = CGDChangeNotes.length;
    console.log("ll",cgdNoteLength)
    var len = val.length;
    if (len > 2000) {
        val = val.substring(0, 2000);
    } else {
        $('#cgdNotesRemainingCharacters').text(2000 - len);
    }
   
  }

  DeaccessionNotesFunc(val){
    console.log("vall1",val)
    var DeaccessionNotes = $('#DeaccessionNotes').val();
    var deaNoteLength = DeaccessionNotes.length;
    console.log("ll",deaNoteLength)
    var len = val.length;
    if (len > 2000) {
        val = val.substring(0, 2000);
    } else {
        $('#deaccessionNotesRemainingCharacters').text(2000 - len);
    }
   
  }

}
