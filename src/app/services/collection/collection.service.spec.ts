import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { of } from 'rxjs';

import { CollectionService } from './collection.service';
import { CollectionForm } from '../../model/CollectionForm';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { error } from '@angular/compiler/src/util';

describe('CollectionService', () => {
  let service: CollectionService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [CollectionService, HttpClient, HttpHandler]

    })
      .compileComponents();
  }));

  const postData = {
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

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new CollectionService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(CollectionService);
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('validate displyRecords() response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.displyRecords(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('validate openMarcView() response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.openMarcView(postData).subscribe((res) =>
      expect(res).toBeNaN,
      (error) => {
        console.log(error);
      });
  });
  it('validate updateCollection() response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.updateCollection(postData).subscribe((res) =>
      expect(res).toBeNaN,
      (error) => {
        console.log(error);
      });
  });
  it('validate checkCrossInstitutionBorrowed() response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.checkCrossInstitutionBorrowed(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
});
