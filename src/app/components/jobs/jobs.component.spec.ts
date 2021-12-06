import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { JobsComponent } from './jobs.component';


describe('JobsComponent', () => {
  let fixture: ComponentFixture<JobsComponent>;
  let component: JobsComponent;
  let service: JobsService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let spinner: NgxSpinnerService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [JobsService, NgxSpinnerService, HttpClient, HttpHandler]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new JobsService(httpClientSpy as any);
    component = new JobsComponent(service, spinner);
    spinner = new NgxSpinnerService();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
