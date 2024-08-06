import { HttpClient, HttpHandler } from '@angular/common/http';
import {} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';

import { DashBoardService } from './dash-board.service';

describe('DashBoardService', () => {
  let service: DashBoardService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [DashBoardService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new DashBoardService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  var test = 'test';
  it('validate checkPermission response', () => {
    httpClientSpy.get.and.returnValues(of(test));
    service.checkPermission(test).subscribe((res) =>
      expect(res).toBeNull);
  });
  it('validate getVersionNumber response', () => {
    httpClientSpy.get.and.returnValues(of(test));
    service.getVersionNumber().subscribe((res) =>
      expect(res).toBeNull);
  });
});
