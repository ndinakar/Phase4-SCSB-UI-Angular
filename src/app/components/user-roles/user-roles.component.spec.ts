import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRolesService } from 'src/app/services/userRoles/user-roles.service';

import { UserRolesComponent } from './user-roles.component';

describe('UserRolesComponent', () => {
  let fixture: ComponentFixture<UserRolesComponent>;
  let component: UserRolesComponent;
  let service: UserRolesService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let spinner: NgxSpinnerService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [UserRolesService, HttpClient, HttpHandler]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new UserRolesService(httpClientSpy as any);
    component = new UserRolesComponent(service, spinner);
    spinner = new NgxSpinnerService();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
