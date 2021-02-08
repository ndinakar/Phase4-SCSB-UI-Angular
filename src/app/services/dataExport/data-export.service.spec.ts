import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { DataExportService } from './data-export.service';


describe('DataExportService', () => {
  let service: DataExportService;

  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [DataExportService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new DataExportService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getRecentDataExportsInfo response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.getRecentDataExportsInfo().subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('startDataDump response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.startDataDump('test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test').subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('getDescriptions response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.getDescriptions().subscribe((res) =>
      expect(res).toBeNaN);
  });
});
