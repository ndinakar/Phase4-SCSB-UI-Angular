import { HttpClient, HttpHandler } from '@angular/common/http';
import {} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';

import { MonitoringService } from './monitoring.service';

describe('MonitoringService', () => {
  let service: MonitoringService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [MonitoringService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new MonitoringService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('displayJobs response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.pullData().subscribe((res) =>
      expect(res).toBeNaN);
  });
});
