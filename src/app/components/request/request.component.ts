import { Component, OnInit } from '@angular/core';




declare var $: any;
import { TreeNode } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestForm } from 'src/app/model/RequestForm';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  requestForm: FormGroup;

  searchBar = false;
  create_request = true;
  itemBarcodeId:string;
  requestingInstitutionId:string;
  itemTitleId:string;
  itemOwningInstitutionId:string;
  patronBarcodeId:string;
  patronEmailId:string;
  requestTypeId:string;
  deliveryLocationId:string;
  requestNotesId:string;
  notesLengthErrMsg=false;
  requestVal: TreeNode[];
  requestTypeErrorMessage=false;
  requestingInstitutionErrorMessage=false;
  deliveryLocationErrorMessage=false;
  itemBarcodeErrorMessage=false;
  itemBarcodeNotFoundErrorMessage=false;
  patronBarcodeErrorMessage=false
  itembarcodeVal:TreeNode[];
  deliveryLocVal:any[];
  eddshow=false;
  startPageErrorMessage=false;
  endPageErrorMessage=false;
  articleTitleErrorMessage=false;
  patronEmailIdErrorMessage=false;
  EmailMandatoryErrorMessage=false;

  StartPage:string;
  EndPage:string;
  VolumeNumber:string;
  Issue:string;
  ArticleAuthor:string;
  ChapterTitle:string;
  createsubmit=false;
  constructor(private formBuilder: FormBuilder,private requestService: RequestService) { }
  
  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      barcodeFieldName: ['']
    });
    this.initialload();
  }

  
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
   initialload(){
   this.requestService.loadCreateRequest().subscribe(
    (res) => {
      this.requestVal=res;
      this.requestTypeId=this.requestVal['requestType'];

      this.itemBarcodeId='';
      this.requestingInstitutionId='';
      this.itemTitleId='';
      this.itemOwningInstitutionId='';
      this.patronBarcodeId='';
      this.patronEmailId='';
      this.deliveryLocationId='';
      this.requestNotesId='';


      this.StartPage='';
      this.EndPage='';
      this.VolumeNumber='';
      this.Issue='';
      this.ArticleAuthor='';
      this.ChapterTitle='';

    },
   (error) => {
      
   }
  
    );
  }
 
  loadSearchRequest() {
    this.searchBar = true;
    this.create_request = false;
  }
  loadCreateRequestnew() {
    this.searchBar = false;
    this.create_request = true;
  }

  NotesLengthValidation(val) {
    console.log("vall", val)
    var requestNotesId = $('#requestNotesId').val();
    var NoteLength = requestNotesId.length;
    console.log("ll", NoteLength)
    var len = val.length;
    if (len > 2000) {
      val = val.substring(0, 2000);
    } else {
      $('#remainingCharacters').text(1000 - len);
    }

  }

  populateItemDetails(itemBarcodeId){
    this.postData ={
      "requestId":null,
      "patronBarcode":null,
      "itemBarcode":null,
      "status":null,
      "deliveryLocation":null,
      "patronBarcodeInRequest":null,
      "itemBarcodeInRequest":itemBarcodeId,
      "deliveryLocationInRequest":null,
      "itemTitle":null,
      "itemOwningInstitution":null,
      "patronEmailAddress":null,
      "requestingInstitution":"PUL",
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
      "onChange":false,
      "institution":null,
      "showRequestErrorMsg":null,
      "requestingInstituionHidden":null,
      "itemBarcodeHidden":null,
      "disableSearchInstitution":false,
      "searchInstitutionHdn":null
   }
   

    this.requestService.populateItemtDetails(this.postData).subscribe(
      (res) => {
        this.itemBarcodeNotFoundErrorMessage=false;
        this.itembarcodeVal=res;
        console.log("lll",this.itembarcodeVal)
        if(!this.itembarcodeVal['errorMessage']){
        this.itemTitleId=this.itembarcodeVal['itemTitle'];
        this.itemOwningInstitutionId=this.itembarcodeVal['itemOwningInstitution'];
        }else{
          this.itemBarcodeNotFoundErrorMessage=true;
        }
  
      },
     (error) => {
        
     }
      );

  }
  populateDeliveryLocations(insituval){

    this.postData ={
      "requestId":null,
      "patronBarcode":null,
      "itemBarcode":null,
      "status":null,
      "deliveryLocation":null,
      "patronBarcodeInRequest":null,
      "itemBarcodeInRequest":this.itemBarcodeId,
      "deliveryLocationInRequest":null,
      "itemTitle":null,
      "itemOwningInstitution":null,
      "patronEmailAddress":null,
      "requestingInstitution":insituval,
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
      "onChange":true,
      "institution":null,
      "showRequestErrorMsg":null,
      "requestingInstituionHidden":null,
      "itemBarcodeHidden":null,
      "disableSearchInstitution":false,
      "searchInstitutionHdn":null
   }
   

    this.requestService.populateItemtDetails(this.postData).subscribe(
      (res) => {
        var del=res['deliveryLocation'];
      //   this.deliveryLocVal = $.map(del, function(value, index) {
      //     return [value];
      // });
      this.deliveryLocVal = Object.keys(del).map(function(data){
        return [data,del[data]];
    });
    console.log(this.deliveryLocVal);
  
      },
     (error) => {
        
     }
      );

  }

  reqTpeEDD(val){
    if(val=='EDD'){
      this.eddshow=true;
    }else{
      this.eddshow=false;
    }

  }

  validateEmailAddress(val){
    console.log("jjjj",val)
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    if(!pattern.test(val))
    {
      console.log("lll11")
      this.patronEmailIdErrorMessage=true;
    }​else{
      console.log("lll11222")
      this.patronEmailIdErrorMessage=false;
    }
  }
  createRequest() { 
    console.log("sd",this.itemBarcodeId)
    console.log("sd",this.requestingInstitutionId)
    console.log("sd",this.patronBarcodeId)
    console.log("start",this.StartPage)
    console.log("arrr",this.ChapterTitle)
    if(this.eddshow){
    //with edd start
    if((this.itemBarcodeId ==undefined || this.itemBarcodeId =='') && (this.requestingInstitutionId==undefined || this.requestingInstitutionId=='') && (this.patronBarcodeId==undefined || this.patronBarcodeId=='') && (this.patronEmailId==undefined || this.patronEmailId=='')  && (this.StartPage==undefined || this.StartPage=='') && (this.StartPage==undefined || this.StartPage=='') && (this.EndPage==undefined || this.EndPage=='') && (this.ChapterTitle==undefined || this.ChapterTitle=='')){
      console.log("1")
      this.itemBarcodeErrorMessage=true;
      this.requestingInstitutionErrorMessage=true;
      this.patronBarcodeErrorMessage=true;
      this.EmailMandatoryErrorMessage=true;
      this.startPageErrorMessage=true;
      this.endPageErrorMessage=true;
      this.articleTitleErrorMessage=true;
    }
    else if( this.itemBarcodeId ==undefined || this.itemBarcodeId =='' || this.itemBarcodeNotFoundErrorMessage==true){
      console.log("2")
      this.itemBarcodeErrorMessage=true;
    }
    else if(this.requestingInstitutionId==undefined || this.requestingInstitutionId==''){
      console.log("3")
      this.requestingInstitutionErrorMessage=true;
    }else if(this.patronBarcodeId==undefined || this.patronBarcodeId=='' ){
      console.log("4")
      this.patronBarcodeErrorMessage=true;
    }else if(this.patronEmailId==undefined || this.patronEmailId=='' || this.patronEmailIdErrorMessage==true){
      console.log("5")
      this.EmailMandatoryErrorMessage=true;
    }else if(this.requestTypeId==undefined || this.requestTypeId==''){
      console.log("6")
      this.requestTypeErrorMessage=true;
    }else if(this.StartPage==undefined || this.StartPage==''){
      console.log("7")
      this.startPageErrorMessage=true;
    }else if(this.EndPage==undefined || this.EndPage==''){
      console.log("8")
      this.endPageErrorMessage=true;
    }else if(this.ChapterTitle==undefined || this.ChapterTitle==''){
      console.log("9")
      this.articleTitleErrorMessage=true;
    }else{
      this.itemBarcodeErrorMessage=false;
      this.requestingInstitutionErrorMessage=false;
      this.patronBarcodeErrorMessage=false;
      this.EmailMandatoryErrorMessage=false;
      this.startPageErrorMessage=false;
      this.endPageErrorMessage=false;
      this.articleTitleErrorMessage=false;
      console.log("success");
      this.postData ={
        "requestId":null,
        "patronBarcode":null,
        "itemBarcode":null,
        "status":null,
        "deliveryLocation":null,
        "patronBarcodeInRequest":this.patronBarcodeId,
        "itemBarcodeInRequest":this.itemBarcodeId,
        "deliveryLocationInRequest":this.deliveryLocationId,
        "itemTitle":this.itemTitleId,
        "itemOwningInstitution":this.itemOwningInstitutionId,
        "patronEmailAddress":this.patronEmailId,
        "requestingInstitution":this.requestingInstitutionId,
        "requestType":this.requestTypeId,
        "requestNotes":this.requestNotesId,
        "startPage":this.StartPage,
        "endPage":this.EndPage,
        "volumeNumber":this.VolumeNumber,
        "issue":this.Issue,
        "articleAuthor":this.ArticleAuthor,
        "articleTitle":this.ChapterTitle,
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
        "onChange":false,
        "institution":null,
        "showRequestErrorMsg":null,
        "requestingInstituionHidden":null,
        "itemBarcodeHidden":null,
        "disableSearchInstitution":false,
        "searchInstitutionHdn":null
     }
     
      this.requestService.createRequest(this.postData).subscribe(
        (res) => {
          this.createsubmit=true;
          console.log("sucesss apiiiiiiii")
        },
        (error) => {
          //Called when error
        })
    }
    //with edd end
    }else{
      //without edd strt
      if((this.itemBarcodeId ==undefined || this.itemBarcodeId =='') && (this.requestingInstitutionId==undefined || this.requestingInstitutionId=='') && (this.patronBarcodeId==undefined || this.patronBarcodeId=='') && (this.deliveryLocationId==undefined || this.deliveryLocationId=='')  ){
        console.log("1")
        this.itemBarcodeErrorMessage=true;
        this.requestingInstitutionErrorMessage=true;
        this.patronBarcodeErrorMessage=true;
        this.deliveryLocationErrorMessage=true;
      }
      else if( this.itemBarcodeId ==undefined || this.itemBarcodeId =='' || this.itemBarcodeNotFoundErrorMessage==true){
        console.log("2")
        this.itemBarcodeErrorMessage=true;
      }
      else if(this.requestingInstitutionId==undefined || this.requestingInstitutionId==''){
        console.log("3")
        this.requestingInstitutionErrorMessage=true;
      }else if(this.patronBarcodeId==undefined || this.patronBarcodeId=='' ){
        console.log("4")
        this.patronBarcodeErrorMessage=true;
      }else if(this.deliveryLocationId==undefined || this.deliveryLocationId==''){
        console.log("5")
        this.deliveryLocationErrorMessage=true;
      }else if(this.requestTypeId==undefined || this.requestTypeId==''){
        console.log("6")
        this.requestTypeErrorMessage=true;
      }else{
        this.itemBarcodeErrorMessage=false;
        this.requestingInstitutionErrorMessage=false;
        this.patronBarcodeErrorMessage=false;
        this.deliveryLocationErrorMessage=false;
        console.log("success");
        this.postData ={
          "requestId":null,
          "patronBarcode":null,
          "itemBarcode":null,
          "status":null,
          "deliveryLocation":null,
          "patronBarcodeInRequest":this.patronBarcodeId,
          "itemBarcodeInRequest":this.itemBarcodeId,
          "deliveryLocationInRequest":this.deliveryLocationId,
          "itemTitle":this.itemTitleId,
          "itemOwningInstitution":this.itemOwningInstitutionId,
          "patronEmailAddress":this.patronEmailId,
          "requestingInstitution":this.requestingInstitutionId,
          "requestType":this.requestTypeId,
          "requestNotes":this.requestNotesId,
          "startPage":this.StartPage,
          "endPage":this.EndPage,
          "volumeNumber":this.VolumeNumber,
          "issue":this.Issue,
          "articleAuthor":this.ArticleAuthor,
          "articleTitle":this.ChapterTitle,
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
          "onChange":false,
          "institution":null,
          "showRequestErrorMsg":null,
          "requestingInstituionHidden":null,
          "itemBarcodeHidden":null,
          "disableSearchInstitution":false,
          "searchInstitutionHdn":null
       }
       
        this.requestService.createRequest(this.postData).subscribe(
          (res) => {
            this.createsubmit=true;
            console.log("sucesss apiiiiiiii222222")
          },
          (error) => {
            //Called when error
          })
      }
  
      //without edd end

    }
     
  }
}
