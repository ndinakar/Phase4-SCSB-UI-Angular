import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer, ɵDomSanitizerImpl } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
import { MonitoringService } from 'src/app/services/monitoring/monitoring.service';
import { LoggingComponent } from './logging.component';

describe('LoggingComponent', () => {
  let fixture: ComponentFixture<LoggingComponent>;
  let component: LoggingComponent;
  let service: MonitoringService;
  let sanitizer: DomSanitizer;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      declarations: [],
      providers: [MonitoringService, HttpHandler, HttpClient,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: () => 'safeString'
          }
        },
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoggingComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new MonitoringService(httpClientSpy as any);
    component = new LoggingComponent(service, sanitizer);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Test ngOnInit', async(() => {
    var data = [{
      label: 'desc',
      data: 'test'
    }]
    spyOn(service, 'pullData').and.returnValues(of(data));
    component.ngOnInit();
    expect(service.pullData()).toBeUndefined();
  }));
});
