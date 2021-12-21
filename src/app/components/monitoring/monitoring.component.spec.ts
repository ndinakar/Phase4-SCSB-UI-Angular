import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { MonitoringService } from 'src/app/services/monitoring/monitoring.service';
import { MonitoringComponent } from './monitoring.component';

describe('MonitoringComponent', () => {
  let fixture: ComponentFixture<MonitoringComponent>;
  let component: MonitoringComponent;
  let service: MonitoringService;
  let sanitizer: DomSanitizer;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [MonitoringService, HttpHandler, HttpClient]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new MonitoringService(httpClientSpy as any);
    component = new MonitoringComponent(service, sanitizer);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Test ngOnInit', waitForAsync(() => {
    var data = [{
      label: 'desc',
      data: 'test'
    }]
    spyOn(service, 'pullData').and.returnValues(of(data));
    component.ngOnInit();
    expect(service.pullData()).toBeUndefined();
  }));
});
