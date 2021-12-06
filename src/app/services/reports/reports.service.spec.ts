import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { ReportsService } from './reports.service';


describe('ReportsService', () => {
  let service: ReportsService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [ReportsService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new ReportsService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  const postData = {
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
    //"collectionGroupDesignations": [],
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
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('firstCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.firstCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('nextCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.nextCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('previousCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.previousCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('lastCall response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.lastCall(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('incompleteReportPageSizeChange response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.incompleteReportPageSizeChange(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('submit response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.submit(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('getInstitutions response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.getInstitutions().subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('incompleteRecords response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.incompleteRecords(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('deaccessionInformation response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.deaccessionInformation(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('exportData response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.exportData(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('collectionGroupDesignation response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.collectionGroupDesignation().subscribe((res) =>
      expect(res).toBeNaN);
  });
});
