import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [LoginService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new LoginService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('displayJobs response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.getInstitutions().subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('loginCheck response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.loginCheck().subscribe((res) =>
      expect(res).toHaveBeenCalledWith());
  });
});
