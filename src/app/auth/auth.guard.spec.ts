import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs/internal/observable/of';
import { RolesPermissionsService } from '../services/rolesPermissions/roles-permissions.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let cookieService: CookieService;
  let router: Router;
  let rolesService: RolesPermissionsService;
  let next: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot

  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [AuthGuard, HttpClient, HttpHandler, Router]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    guard = new AuthGuard(cookieService, httpClientSpy as any, router, rolesService);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('canActivate response', () => {
    httpClientSpy.get.and.returnValues(of());
    expect(guard.canActivate(next, state)).toBeDefined();
  });
});
