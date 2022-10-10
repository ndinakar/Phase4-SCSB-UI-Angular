import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashBoardService } from 'src/app/services/dashBoard/dash-board.service';
import { DataExportService } from 'src/app/services/dataExport/data-export.service';
import { RolesPermissionsService } from 'src/app/services/rolesPermissions/roles-permissions.service';
import { DataExportComponent } from '../data-export/data-export.component';
import { DashboardComponent } from './dashboard.component';


describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let service: DashBoardService;
  let rolesService: RolesPermissionsService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [DashBoardService, RolesPermissionsService, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new DashBoardService(httpClientSpy as any);
    component = new DashboardComponent(router, rolesService, service);
    rolesService = new RolesPermissionsService();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
