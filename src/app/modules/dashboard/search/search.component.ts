import { Component, OnInit, ViewChild } from '@angular/core';
import { NodeService } from '../dashboardservice';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { SearchRecordRequest } from 'src/app/model/SearchRecordRequest';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [MessageService],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class SearchComponent implements OnInit {

  searchVal: TreeNode[];
  selectedNodes1: TreeNode[];
  selectedNodes2: TreeNode[];

  cols: any[];
  cols1: any[];
  exportColumns: any[];
  showresultdiv = false;
  clicked = true;
  checked = true;

  owningInstitutions: any = [];
  collectionGroupDesignations: any = [];
  availability: any = [];
  materialTypes: any = [];
  useRestrictions: any = [];
  searchForm: FormGroup;

  postData = {
    "fieldValue": "",
    "fieldName": "",
    "owningInstitutions": [
      "CUL",
      "PUL",
      "NYPL"
    ],
    "collectionGroupDesignations": [
      "Shared",
      "Private",
      "Open"
    ],
    "availability": [
      "Available",
      "NotAvailable"
    ],
    "materialTypes": [
      "Serial",
      "Monograph",
      "Other"
    ],
    "useRestrictions": [
      "NoRestrictions",
      "InLibraryUse",
      "SupervisedUse"
    ],
    "searchResultRows": [],
    "catalogingStatus": "Complete",
    "pageNumber": 0,
    "pageSize": 10,
    "isDeleted": false,
    "totalPageCount": 0,
    "totalBibRecordsCount": "0",
    "totalItemRecordsCount": "0",
    "totalRecordsCount": "0",
    "showResults": false,
    "selectAll": false,
    "selectAllFacets": true,
    "showTotalCount": false,
    "index": null,
    "errorMessage": null
  }

  searchfieldval = [
    { id: 'Author_search', name: "Author" },
    { id: 'Title_search', name: "Title" },
    { id: 'TitleStartsWith', name: "Title Browse(first word)" },
    { id: 'Publisher', name: "Publisher" },
    { id: 'PublicationPlace', name: "Publication Place" },
    { id: 'PublicationDate', name: "Publication Date" },
    { id: 'Subject', name: "Subject" },
    { id: 'ISBN', name: "ISBN" },
    { id: 'ISSN', name: "ISSN" },
    { id: 'OCLCNumber', name: "OCLC Number" },
    { id: 'Notes', name: "Notes" },
    { id: 'CustomerCode', name: "Customer_Code" },
    { id: 'CallNumber_search', name: "Call Number" },
    { id: 'Barcode', name: "Barcode" }
  ];

  @ViewChild('dt') dt: Table;
  constructor(private nodeService: NodeService, private messageService: MessageService, private formBuilder: FormBuilder) {

  }
  public data: Object[];


  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      fieldValue: [''],
      fieldName: [''],
      owningInstitutionNYPL: [true],
      owningInstitutionCUL: [true],
      owningInstitutionPUL: [true],
      Monograph: [true],
      Serial: [true],
      others: [true],
      shared: [true],
      private: [true],
      open: [true],
      Available: [true],
      notAvailable: [true],
      NoRestrictions: [true],
      InLibraryUse: [true],
      SupervisedUse: [true]

    });

  }



  searchRecord() {
    this.owningInstitutions = [];
    this.collectionGroupDesignations = [];
    this.availability = [];
    this.materialTypes = [];
    this.useRestrictions = [];

    var searchfullrec = this.searchForm.value;
    if (searchfullrec.owningInstitutionNYPL == true) {
      this.owningInstitutions.push('NYPL')
    }
    if (searchfullrec.owningInstitutionCUL == true) {
      this.owningInstitutions.push('CUL')
    }
    if (searchfullrec.owningInstitutionPUL == true) {
      this.owningInstitutions.push('PUL')
    }

    if (searchfullrec.shared == true) {
      this.collectionGroupDesignations.push('Shared')
    }
    if (searchfullrec.private == true) {
      this.collectionGroupDesignations.push('Private')
    }
    if (searchfullrec.open == true) {
      this.collectionGroupDesignations.push('Open')
    }

    if (searchfullrec.Available == true) {
      this.availability.push('Available')
    }
    if (searchfullrec.notAvailable == true) {
      this.availability.push('NotAvailable')
    }

    if (searchfullrec.Monograph == true) {
      this.materialTypes.push('Monograph')
    }
    if (searchfullrec.Serial == true) {
      this.materialTypes.push('Serial')
    }
    if (searchfullrec.others == true) {
      this.materialTypes.push('others')
    }

    if (searchfullrec.NoRestrictions == true) {
      this.useRestrictions.push('NoRestrictions')
    }

    if (searchfullrec.InLibraryUse == true) {
      this.useRestrictions.push('InLibraryUse')
    }

    if (searchfullrec.SupervisedUse == true) {
      this.useRestrictions.push('SupervisedUse')
    }

    this.postData = {
      "fieldValue": searchfullrec.fieldValue,
      "fieldName": searchfullrec.fieldName,
      "owningInstitutions": this.owningInstitutions,
      "collectionGroupDesignations": this.collectionGroupDesignations,
      "availability": this.availability,
      "materialTypes": this.materialTypes,
      "useRestrictions": this.useRestrictions,
      "searchResultRows": [],
      "catalogingStatus": "Complete",
      "pageNumber": 0,
      "pageSize": 10,
      "isDeleted": false,
      "totalPageCount": 0,
      "totalBibRecordsCount": "0",
      "totalItemRecordsCount": "0",
      "totalRecordsCount": "0",
      "showResults": false,
      "selectAll": false,
      "selectAllFacets": true,
      "showTotalCount": false,
      "index": null,
      "errorMessage": null
    }

    console.log("overall", this.postData)

    this.showresultdiv = true;
    this.nodeService.getSearch(this.postData).subscribe(files => this.searchVal = files);

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'author', header: 'Author' },
      { field: 'publisher', header: 'Publisher' },
      { field: 'publisherDate', header: 'Publisher Date' },
      { field: 'owningInstitution', header: 'OI' },
      { field: 'customerCode', header: 'CC' },
      { field: 'collectionGroupDesignation', header: 'CGD' },
      { field: 'useRestriction', header: 'Use Restriction' },
      { field: 'barcode', header: 'Barcode' },
      { field: 'summaryHoldings', header: 'SH' }
    ];

    this.cols1 = [
      { field: 'callNumber', header: 'Call Number' },
      { field: 'chronologyAndEnum', header: 'Chronology & Enum' },
      { field: 'customerCode', header: 'CC' },
      { field: 'collectionGroupDesignation', header: 'CGD' },
      { field: 'useRestriction', header: 'Use Restriction' },
      { field: 'barcode', header: 'Barcode' },
    ];
  }

  onRowSelect(event) {
    this.clicked = false;
    this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: 'title: ' + event.data.title });
  }

  onRowUnselect(event) {
    this.clicked = true;
    this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: 'title: ' + event.data.title });
  }

  checkUncheckAll() {
    var searchallvalue = this.searchForm.value;
    console.log("texxttt", searchallvalue.fieldValue)
    if (this.checked === true) {
      this.checked = false;
      this.searchForm = this.formBuilder.group({
        fieldValue: [searchallvalue.fieldValue],
        fieldName: [searchallvalue.fieldName],
        owningInstitutionNYPL: [false],
        owningInstitutionCUL: [false],
        owningInstitutionPUL: [false],
        Monograph: [false],
        Serial: [false],
        others: [false],
        shared: [false],
        private: [false],
        open: [false],
        Available: [false],
        notAvailable: [false],
        NoRestrictions: [false],
        InLibraryUse: [false],
        SupervisedUse: [false]

      });
    } else {
      this.checked = true;
      this.searchForm = this.formBuilder.group({
        fieldValue: [searchallvalue.fieldValue],
        fieldName: [searchallvalue.fieldName],
        owningInstitutionNYPL: [true],
        owningInstitutionCUL: [true],
        owningInstitutionPUL: [true],
        Monograph: [true],
        Serial: [true],
        others: [true],
        shared: [true],
        private: [true],
        open: [true],
        Available: [true],
        notAvailable: [true],
        NoRestrictions: [true],
        InLibraryUse: [true],
        SupervisedUse: [true]

      });

    }
  }

  isChangeLimitAccessToggle(e) {
    //   var checkvalue=this.searchForm.value;
    //   console.log("texxttt",checkvalue.owningInstitutionNYPL)
    // console.log("checkkval",e)
    //   if(e='NYPL'){
    //     this.searchForm.controls['owningInstitutionNYPL'].setValue(e);
    //    }else{
    //     this.searchForm.controls['owningInstitutionNYPL'].setValue(false);
    //    }


  }
  onReset() {

    this.searchForm = this.formBuilder.group({
      fieldValue: [''],
      fieldName: [''],
      owningInstitutionNYPL: [true],
      owningInstitutionCUL: [true],
      owningInstitutionPUL: [true],
      Monograph: [true],
      Serial: [true],
      others: [true],
      shared: [true],
      private: [true],
      open: [true],
      Available: [true],
      notAvailable: [true],
      NoRestrictions: [true],
      InLibraryUse: [true],
      SupervisedUse: [true]

    });
  }
  setFileName() {
    this.dt.exportFilename = 'ExportRecords' + '_' +
      new DatePipe('en-US').transform(Date.now(), 'yyyyMMddhhmmss', 'UTC');
    //this.dt.exportCSV();
  }
}
