import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataExportService } from 'src/app/services/dataExport/data-export.service';

import { DataExportComponent } from './data-export.component';

describe('DataExportComponent', () => {
  let component: DataExportComponent;
  let fixture: ComponentFixture<DataExportComponent>;
  let service: DataExportService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let spinner: NgxSpinnerService;
  let router: Router;
  let cookieService: CookieService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [DataExportService, NgxSpinnerService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new DataExportService(httpClientSpy as any);
    component = new DataExportComponent(router, service, spinner, cookieService);
    spinner = new NgxSpinnerService();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
