import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { RolesPermissionsService } from 'src/app/services/rolesPermissions/roles-permissions.service';
import { SearchService } from 'src/app/services/search/search.service';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;
  let service: SearchService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let spinner: NgxSpinnerService;
  let reportsService: ReportsService;
  let messageService: MessageService;
  let formBuilder: FormBuilder;
  let router: Router;
  let roleService: RolesPermissionsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [SearchService, MessageService, RolesPermissionsService, HttpClient, HttpHandler, FormBuilder, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new SearchService(httpClientSpy as any);
    component = new SearchComponent(roleService, reportsService, service, messageService, formBuilder, router, spinner);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
