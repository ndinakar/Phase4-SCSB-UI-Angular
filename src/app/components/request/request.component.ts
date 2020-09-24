import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private requestService: RequestService) { }
  postData = {
    "requestId":null,
    "patronBarcode":null,
    "itemBarcode":null,
    "status":null,
    "deliveryLocation":null,
    "patronBarcodeInRequest":null,
    "itemBarcodeInRequest":null,
    "deliveryLocationInRequest":null,
    "itemTitle":null,
    "itemOwningInstitution":null,
    "patronEmailAddress":null,
    "requestingInstitution":null,
    "requestType":null,
    "requestNotes":null,
    "startPage":null,
    "endPage":null,
    "volumeNumber":null,
    "issue":null,
    "articleAuthor":null,
    "articleTitle":null,
    "message":null,
    "errorMessage":null,
    "totalRecordsCount":"0",
    "pageNumber":0,
    "pageSize":10,
    "totalPageCount":0,
    "submitted":false,
    "showResults":false,
    "requestingInstitutions":[
       
    ],
    "requestTypes":[
       
    ],
    "deliveryLocations":[
       
    ],
    "searchResultRows":[
       
    ],
    "requestStatuses":[
       
    ],
    "institutionList":[
       
    ],
    "disableRequestingInstitution":false,
    "onChange":null,
    "institution":null,
    "showRequestErrorMsg":null,
    "requestingInstituionHidden":null,
    "itemBarcodeHidden":null,
    "disableSearchInstitution":false,
    "searchInstitutionHdn":null
 }
  searchBar = false;
  create_request = true;
  ngOnInit(): void {
  }
  loadSearchRequest() {
    this.searchBar = !this.searchBar;
    this.create_request = !this.create_request;
    console.log("test"+this.create_request+" bar"+this.searchBar)
  }
  loadCreateRequest() {
    this.searchBar = !this.searchBar;
    this.create_request = !this.create_request;
  }
  createRequest() { 
    this.requestService.loadCreateRequest().subscribe( (res) => { }, (error) => { } ); 
  }
}
