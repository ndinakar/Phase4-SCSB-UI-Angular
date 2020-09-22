import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { of } from 'rxjs';

import { CollectionService } from './collection.service';
import { CollectionForm } from '../../model/CollectionForm';

describe('#CollectionService', () => {
 let postData: CollectionForm;
  let service: CollectionService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [CollectionService, HttpClient, HttpHandler]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new CollectionService(httpClientSpy as any);
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionService);
  });

  it('#should be created', () => {
    expect(service).toBeTruthy();
  });
  // it('validate displyRecords() response',() => {
  //   httpClientSpy.post.and.returnValues(of());
  //   service.displyRecords(postData).subscribe((res) => 
  //   expect(res).toEqual(),fail);
  // });
});
