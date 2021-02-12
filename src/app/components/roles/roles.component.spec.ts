import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams, HttpHandler } from '@angular/common/http';
import { RolesComponent } from './roles.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolesService } from 'src/app/services/roles/roles.service';
declare var $: any;
describe('RolesComponent', () => {
  let fixture: ComponentFixture<RolesComponent>;
  let component: RolesComponent;
  let service: RolesService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let spinner: NgxSpinnerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [RolesService, HttpClient, HttpHandler]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new RolesService(httpClientSpy as any);
    component = new RolesComponent(service, spinner);
    spinner = new NgxSpinnerService();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
