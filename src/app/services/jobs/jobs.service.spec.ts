import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { JobsService } from './jobs.service';


describe('JobsService', () => {
  let service: JobsService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [JobsService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new JobsService(httpClientSpy as any);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  const postData = {
    "jobId": null,
    "jobName": null,
    "jobDescription": null,
    "cronExpression": null,
    "scheduleType": null,
    "message": null,
    "errorMessage": null,
    "jobEntities": null
  }
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('displayJobs response', () => {
    httpClientSpy.get.and.returnValues(of());
    service.displayJobs().subscribe((res) =>
      expect(res).toBeNaN);
  });
  it('scheduleJobs response', () => {
    httpClientSpy.post.and.returnValues(of(postData));
    service.scheduleJobs(postData).subscribe((res) =>
      expect(res).toBeNaN);
  });
});
