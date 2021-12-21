import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [SearchService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new SearchService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  const postData = {
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
  it('getSearch response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.getSearch(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('searchLast response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.searchLast(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('searchFirst response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.searchFirst(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('searchPrevious response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.searchPrevious(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('searchNext response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.searchNext(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('onPageSizeChange response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.onPageSizeChange(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
});
