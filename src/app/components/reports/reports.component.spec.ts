import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportsService } from 'src/app/services/reports/reports.service';

import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let fixture: ComponentFixture<ReportsComponent>;
  let component: ReportsComponent;
  let service: ReportsService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let spinner: NgxSpinnerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [ReportsService, HttpClient, HttpHandler]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new ReportsService(httpClientSpy as any);
    component = new ReportsComponent(service, spinner);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
