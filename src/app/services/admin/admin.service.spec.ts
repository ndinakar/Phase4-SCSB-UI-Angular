import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [AdminService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new AdminService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  const fileToUpload: File = new File([], 'test');
  it('validate upload response', () => {
    httpClientSpy.post.and.returnValues(of());
    service.upload(fileToUpload).subscribe((res) =>
      expect(res).toBeNull);
  });
  it('validate uploadIMSLocations response', () => {
    httpClientSpy.post.and.returnValues(of());
    service.uploadIMSLocations(fileToUpload).subscribe((res) =>
      expect(res).toBeNull);
  });
});
