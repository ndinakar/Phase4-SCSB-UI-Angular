import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OpenMarcService } from 'src/app/services/openMarc/open-marc.service';
import { OpenMarcComponent } from './open-marc.component';


describe('OpenMarcComponent', () => {
  let component: OpenMarcComponent;
  let spinner: NgxSpinnerService;
  let routeParams: ActivatedRoute;
  let titleService: Title;
  let service: OpenMarcService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [OpenMarcService, HttpClient, HttpHandler, Title]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new OpenMarcService(httpClientSpy as any);
    component = new OpenMarcComponent(service, spinner, routeParams, titleService);
    spinner = new NgxSpinnerService();
    titleService = new Title('test.html');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
