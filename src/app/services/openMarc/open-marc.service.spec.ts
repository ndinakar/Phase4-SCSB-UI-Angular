import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OpenMarcService } from './open-marc.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';


describe('OpenMarcService', () => {
  let service: OpenMarcService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [OpenMarcService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new OpenMarcService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('openMarc response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.openMarc('test').subscribe((res) =>
      expect(res).toBeNaN);
  });
});
