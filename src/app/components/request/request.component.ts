import { Component, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router'; 


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
  firstbutton = true;
  previousbutton = true;
  nextbutton = false;
  lastbutton = false;
  messageNoSearchRecords = false;
  searchReqresultFirst = false;
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

  searchReqVal: TreeNode[];
  searchPatronBarcode:string;
  searchItemBarcode:string;
  requestStatus:string;
  searchInstitutionList:string;
  searchReqresult=false;
  patronBarcodeSearchError=false;
  itemBarcodeSearchError=false;
  noteAll=true;
  noteActive=false;
  searchreqResultVal:TreeNode[];

  requestNotesData:string;
  resubmitReqConfirmItemBarcode:string;
  requestId:string;
  resubmitRequestConfirmBodyId=true;
  reqcancelmsg:string;
  nextvalue = 0;
  previousValue=0;
  lastValue=0;
  showentries = 3;

  constructor(private formBuilder: FormBuilder,private requestService: RequestService, private router:ActivatedRoute) { }
  
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
      "pageSize":3,
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
    this.requestStatus='';
    this.searchPatronBarcode='';
    this.searchItemBarcode='';
    this.searchReqresult=false;
    this.searchBar = true;
    this.create_request = false;
    this.requestService.loadSearchRequest().subscribe(
      (res) => {
       this.searchReqVal=res;
       
      },
     (error) => {
        
     }
    
      );
  }
  loadCreateRequestnew() {
    this.searchBar = false;
    this.create_request = true;
    this.createsubmit=false;
    this.initialload();
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
      "pageSize":3,
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
      "pageSize":3,
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
    console.log("DeliveryLocations",this.deliveryLocVal);
  
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
      this.patronEmailIdErrorMessage=true;
    }​else{
      this.patronEmailIdErrorMessage=false;
    }
  }
  createRequest() { 
    console.log("sd",this.itemBarcodeId)
    console.log("InstitutionId",this.requestingInstitutionId)
    console.log("sd",this.patronBarcodeId)
    console.log("start",this.StartPage)
    console.log("arrr",this.ChapterTitle)
    console.log("DeliveryLOcations",this.deliveryLocationId)
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
        "pageSize":3,
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
          "pageSize":3,
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

  resetDefaults(){
    this.deliveryLocVal=[];
    this.eddshow=false;
    this.initialload();
  }
  differentpatron(){
    this.deliveryLocVal=[];
    this.eddshow=false;
    this.createsubmit=false;
    this.initialload();
  }
  loadCreateRequestForSamePatron(patronId,reqInstId){
    this.eddshow=false;
    this.createsubmit=false;
    this.requestService.loadCreateRequest().subscribe(
      (res) => {
        this.requestVal=res;
        this.requestTypeId=this.requestVal['requestType'];
  
        this.itemBarcodeId='';
        this.requestingInstitutionId=reqInstId;
        this.itemTitleId='';
        this.itemOwningInstitutionId='';
        this.patronBarcodeId=patronId;
        this.patronEmailId='';
        this.deliveryLocationId='';
        this.requestNotesId='';
  
  
        this.StartPage='';
        this.EndPage='';
        this.VolumeNumber='';
        this.Issue='';
        this.ArticleAuthor='';
        this.ChapterTitle='';

        this.deliveryLocVal=[];
  
      },
     (error) => {
        
     }
    
      );
  }

  goToSearchRequest(patronBarcode){
    this.searchPatronBarcode=patronBarcode;
    this.requestStatus='';
    this.requestService.loadSearchRequest().subscribe(
      (res) => {
       this.searchReqVal=res;
       //search start
       this.postData ={
          "requestId":null,
          "patronBarcode":this.searchPatronBarcode,
          "itemBarcode":this.searchItemBarcode,
          "status":this.requestStatus,
          "deliveryLocation":null,
          "patronBarcodeInRequest":null,
          "itemBarcodeInRequest":null,
          "deliveryLocationInRequest":null,
          "itemTitle":null,
          "itemOwningInstitution":null,
          "patronEmailAddress":null,
          "requestingInstitution":this.searchInstitutionList,
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
          "pageSize":3,
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
       
        this.requestService.searchRequests(this.postData).subscribe(
          (res) => {
            this.searchReqresultFirst = true;
            this.searchBar = true;
            this.create_request = false;
            this.searchReqresult=true;
            this.searchreqResultVal=res;
            this.pagination();
            console.log("message Value",this.searchreqResultVal['message']);
            console.log("patron",this.searchreqResultVal['searchResultRows']);
          
          },
          (error) => {
            //Called when error
          })
       //search end
       
      },
     (error) => {
        
     }
    
      );
  }

  searchRequests(){
    if(this.requestStatus=='' || this.requestStatus==undefined ){
     if(this.searchItemBarcode || this.searchPatronBarcode){
       //search api call start
      this.patronBarcodeSearchError=false;
      this.itemBarcodeSearchError=false;
      this.postData ={
        "requestId":null,
        "patronBarcode":this.searchPatronBarcode,
        "itemBarcode":this.searchItemBarcode,
        "status":this.requestStatus,
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
        "pageSize":this.showentries,
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
        "institution":this.searchInstitutionList,
        "showRequestErrorMsg":null,
        "requestingInstituionHidden":null,
        "itemBarcodeHidden":null,
        "disableSearchInstitution":false,
        "searchInstitutionHdn":null
     }
     
      this.requestService.searchRequests(this.postData).subscribe(
        (res) => {
          this.searchReqresultFirst=true;
          this.searchreqResultVal=res;
          this.pagination();
          if(this.searchreqResultVal['message'] != null){
            this.messageNoSearchRecords =true;
            this.searchReqresult = false;
          }else{
            this.messageNoSearchRecords =false;
            this.searchReqresult = true;
          }
        },
        (error) => {
          //Called when error
        })
        //search api call end
     }else if((this.searchItemBarcode==undefined || this.searchItemBarcode=='') && (this.searchItemBarcode==undefined || this.searchItemBarcode=='')){
      console.log("1")
      this.patronBarcodeSearchError=true;
      this.itemBarcodeSearchError=true;
     }
     else if(this.searchItemBarcode==undefined || this.searchItemBarcode==''){
      console.log("2")
      this.patronBarcodeSearchError=true;
     }else if(this.searchItemBarcode==undefined || this.searchItemBarcode==''){
      console.log("3")
      this.itemBarcodeSearchError=true;
     }
    }else{
      console.log("out")
       //search api call start
       this.patronBarcodeSearchError=false;
       this.itemBarcodeSearchError=false;
       this.postData ={
         "requestId":null,
         "patronBarcode":this.searchPatronBarcode,
         "itemBarcode":this.searchItemBarcode,
         "status":this.requestStatus,
         "deliveryLocation":null,
         "patronBarcodeInRequest":null,
         "itemBarcodeInRequest":null,
         "deliveryLocationInRequest":null,
         "itemTitle":null,
         "itemOwningInstitution":null,
         "patronEmailAddress":null,
         "requestingInstitution":this.searchInstitutionList,
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
         "pageSize":3,
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
         "institution":this.searchInstitutionList,
         "showRequestErrorMsg":null,
         "requestingInstituionHidden":null,
         "itemBarcodeHidden":null,
         "disableSearchInstitution":false,
         "searchInstitutionHdn":null
      }
      
       this.requestService.searchRequests(this.postData).subscribe(
         (res) => {
          this.searchReqresultFirst=true;
          this.searchreqResultVal=res;
          this.pagination();
          console.log("message Value",this.searchreqResultVal['message']);
          if(this.searchreqResultVal['message'] != null){
            console.log("message Value",this.searchreqResultVal['message']);
            this.messageNoSearchRecords =true;
            this.searchReqresult = false;
          }else{
            this.messageNoSearchRecords =false;
            this.searchReqresult = true;
          }
         },
         (error) => {
           //Called when error
         })
         //search api call end

    }
  }

  onChangeRequestStatus(statusVal){
    if(statusVal=='' || statusVal==undefined ){
      this.noteActive=false;
      this.noteAll=true;
    }else if(statusVal=='Active'){
      this.noteActive=true;
      this.noteAll=false;
      this.patronBarcodeSearchError=false;
       this.itemBarcodeSearchError=false;
    }else{
      this.noteActive=false;
      this.noteAll=false;
      this.patronBarcodeSearchError=false;
       this.itemBarcodeSearchError=false;
    }
  }

  reqNotemodal(notes){
    this.requestNotesData=notes;
    $('#requestNotesModal').modal({ show: true });
  }

  resubmitReq(itembarcode,reqId){
    this.resubmitReqConfirmItemBarcode=itembarcode;
    this.requestId=reqId;
    this.resubmitRequestConfirmBodyId=true;
    $('#resubmitRequestModal').modal({ show: true });
  }
  cancelRequest(reqId){
    this.requestId=reqId;
    this.reqcancelmsg='';
    $('#cancelConfirmationModal').modal({ show: true });
  }

  closeResubmitRequestItem(){
    $('#resubmitRequestModal').modal({ show: false });
  }

  resubmitRequestItem(){
    
    this.postData ={
      "requestId":this.requestId,
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
      "pageSize":3,
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
   
   
    this.requestService.resubmitRequest(this.postData).subscribe(
      (res) => {
        this.resubmitRequestConfirmBodyId=false;
        this.searchRequests();
      },
      (error) => {
        //Called when error
      })

  }


  cancelRequestItem(){
    
    this.postData ={
      "requestId":this.requestId,
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
      "pageSize":3,
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
   
   
    this.requestService.cancelRequest(this.postData).subscribe(
      (res) => {
        var msg=res['Message'];
        this.reqcancelmsg=msg;
        $("#cancelBtn").trigger("click");
        $('#cancelRequestModal').modal({ show: true });
        this.searchRequests();
      },
      (error) => {
        //Called when error
      })

  }
  firstCall(){
    this.postData ={
      "requestId":null,
      "patronBarcode":this.searchPatronBarcode,
      "itemBarcode":this.searchItemBarcode,
      "status":this.requestStatus,
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
      "pageNumber":this.searchreqResultVal['pageNumber'],
      "pageSize":this.showentries,
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
      "institution":this.searchInstitutionList,
      "showRequestErrorMsg":null,
      "requestingInstituionHidden":null,
      "itemBarcodeHidden":null,
      "disableSearchInstitution":false,
      "searchInstitutionHdn":null
   }
    this.requestService.firstCall(this.postData).subscribe(
      (res) => {
        this.searchreqResultVal=res;
        this.pagination();
      },
      (error) => {
        //Called when error
      })

  }
  previousCall(){
    this.postData ={
      "requestId":null,
      "patronBarcode":this.searchPatronBarcode,
      "itemBarcode":this.searchItemBarcode,
      "status":this.requestStatus,
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
      "pageNumber":this.searchreqResultVal['pageNumber'],
      "pageSize":this.showentries,
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
      "institution":this.searchInstitutionList,
      "showRequestErrorMsg":null,
      "requestingInstituionHidden":null,
      "itemBarcodeHidden":null,
      "disableSearchInstitution":false,
      "searchInstitutionHdn":null
   }
    this.requestService.previousCall(this.postData).subscribe(
      (res) => {
        this.searchreqResultVal=res;
        this.pagination();
      },
      (error) => {
        //Called when error
      })
  }
  nextCall(){
    this.postData ={
      "requestId":null,
      "patronBarcode":this.searchPatronBarcode,
      "itemBarcode":this.searchItemBarcode,
      "status":this.requestStatus,
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
      "pageNumber":this.searchreqResultVal['pageNumber'],
      "pageSize":this.showentries,
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
      "institution":this.searchInstitutionList,
      "showRequestErrorMsg":null,
      "requestingInstituionHidden":null,
      "itemBarcodeHidden":null,
      "disableSearchInstitution":false,
      "searchInstitutionHdn":null
   }
    this.requestService.nextCall(this.postData).subscribe(
      (res) => {
        this.searchreqResultVal=res;
        this.pagination();
      },
      (error) => {
        //Called when error
      })
  }
  lastCall(){
    this.postData ={
      "requestId":null,
      "patronBarcode":this.searchPatronBarcode,
      "itemBarcode":this.searchItemBarcode,
      "status":this.requestStatus,
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
      "pageNumber":this.searchreqResultVal['pageNumber'],
      "pageSize":this.showentries,
      "totalPageCount":this.searchreqResultVal['totalPageCount'],
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
      "institution":this.searchInstitutionList,
      "showRequestErrorMsg":null,
      "requestingInstituionHidden":null,
      "itemBarcodeHidden":null,
      "disableSearchInstitution":false,
      "searchInstitutionHdn":null
   }
    this.requestService.lastCall(this.postData).subscribe(
      (res) => {
        this.searchreqResultVal=res;
        this.pagination();
      },
      (error) => {
        //Called when error
      })
  }

  onPageSizeChange(value) {
    console.log("showEntries value",value)
    this.showentries = value;
    this.postData ={
      "requestId":null,
      "patronBarcode":this.searchPatronBarcode,
      "itemBarcode":this.searchItemBarcode,
      "status":this.requestStatus,
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
      "totalRecordsCount":this.searchreqResultVal['totalRecordsCount'],
      "pageNumber":this.searchreqResultVal['pageNumber'],
      "pageSize":this.showentries,
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
      "institution":this.searchInstitutionList,
      "showRequestErrorMsg":null,
      "requestingInstituionHidden":null,
      "itemBarcodeHidden":null,
      "disableSearchInstitution":false,
      "searchInstitutionHdn":null
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
  pagination(){
        if(this.searchreqResultVal['pageNumber'] == 0 && (this.searchreqResultVal['totalPageCount']-1 >0)){
          this.firstbutton = true;
          this.previousbutton = true;
          this.nextbutton = false;
          this.lastbutton = false;
         }else if(this.searchreqResultVal['pageNumber'] == 0 && (this.searchreqResultVal['pageNumber'] == this.searchreqResultVal['totalPageCount']-1)){
          this.firstbutton = true;
          this.previousbutton = true;
          this.nextbutton = true;
          this.lastbutton = true;
        }
        else if((this.searchreqResultVal['pageNumber'] == this.searchreqResultVal['totalPageCount']-1)&&this.searchreqResultVal['totalPageCount']-1>0){
          this.firstbutton = false;
          this.previousbutton = false;
          this.nextbutton = true;
          this.lastbutton = true;
        }else if((this.searchreqResultVal['pageNumber'] < this.searchreqResultVal['totalPageCount']-1)&&(this.searchreqResultVal['pageNumber'] != 0)){
          this.firstbutton = false;
          this.previousbutton = false;
          this.nextbutton = false;
          this.lastbutton = false;
        }
  }
}
