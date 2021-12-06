import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from 'src/app/services/request/request.service';
import { RolesPermissionsService } from 'src/app/services/rolesPermissions/roles-permissions.service';

import { RequestComponent } from './request.component';

describe('RequestComponent', () => {
  let fixture: ComponentFixture<RequestComponent>;
  let component: RequestComponent;
  let service: RequestService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let spinner: NgxSpinnerService;
  let formBuilder: FormBuilder;
  let router: ActivatedRoute;
  let roleService: RolesPermissionsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [RequestService, RolesPermissionsService, HttpClient, HttpHandler, FormBuilder, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get(): string {
                return '123';
              },
            },
          },
        },
      }]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RequestComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new RequestService(httpClientSpy as any);
    component = new RequestComponent(roleService, formBuilder, service, router, spinner);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
