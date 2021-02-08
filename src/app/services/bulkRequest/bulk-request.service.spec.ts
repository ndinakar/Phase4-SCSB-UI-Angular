import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FILE } from 'dns';
import { of } from 'rxjs/internal/observable/of';

import { BulkRequestService } from './bulk-request.service';

describe('BulkRequestService', () => {
  let service: BulkRequestService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [BulkRequestService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new BulkRequestService(httpClientSpy as any);
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
    "deliveryLocationInRequest": null,
    "itemTitle": null,
    "itemOwningInstitution": null,
    "patronEmailAddress": null,
    "requestingInstitution": null,
    "requestType": null,
    "requestNotes": null,
    "message": null,
    "errorMessage": null,
    "totalRecordsCount": "0",
    "pageNumber": 0,
    "pageSize": 0,
    "totalPageCount": 0,
    "submitted": false,
    "showResults": false,
    "requestingInstitutions": [],
    "requestTypes": [],
    "deliveryLocations": [],
    "bulkSearchResultRows": [],
    "requestStatuses": [],
    "institutionList": [],
    "disableRequestingInstitution": false,
    "onChange": null,
    "showRequestErrorMsg": false,
    "requestingInstituionHidden": null,
    "disableSearchInstitution": false,
    "searchInstitutionHdn": null,
    "file": null,
    "requestIdSearch": null,
    "requestNameSearch": null,
    "patronBarcodeSearch": null,
    "institution": null,
    "bulkRequestName": null,
    "patronBarcodeInRequest": null,
    "fileName": null
  }
  it('loadCreateRequest response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.loadCreateRequest().subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('createBulkRequest response', () => {
    httpClientSpy.post.and.returnValues(of());
    service.createBulkRequest('test', 'test', 'test', 'test', 'test', 'test', new File([], 'test')).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('populateDeliveryLocations response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.populateDeliveryLocations(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  //
  it('searchRequest response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.searchRequest(postData).subscribe((res) =>
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
  it('onRequestPageSizeChange response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.onRequestPageSizeChange(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('downloadReports response', () => {
    httpClientSpy.post.and.returnValues(of());
    service.downloadReports('test123').subscribe((res) =>
      expect(res).toBeNaN);
  });

});
