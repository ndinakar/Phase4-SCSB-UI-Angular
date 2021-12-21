import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { RequestService } from './request.service';


describe('RequestService', () => {
  let service: RequestService;

  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [RequestService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new RequestService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  const postData = {
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
    "onChange": null,
    "institution": null,
    "showRequestErrorMsg": null,
    "requestingInstituionHidden": null,
    "itemBarcodeHidden": null,
    "disableSearchInstitution": false,
    "searchInstitutionHdn": null
  }
  it('loadSearchRequest response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.loadSearchRequest().subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('loadCreateRequest response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.loadCreateRequest().subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('onRequestPageSizeChange response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.onRequestPageSizeChange(postData).subscribe((res) =>
      expect(res).toBeNaN);
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
  it('cancelRequest response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.cancelRequest(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('resubmitRequest response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.resubmitRequest(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('goToSearchRequest response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.goToSearchRequest(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('createRequest response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.createRequest(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('populateItemtDetails response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.populateItemtDetails(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('searchRequests response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.searchRequests(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
});
