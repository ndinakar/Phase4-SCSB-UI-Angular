import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

import { RolesPermissionsService } from './roles-permissions.service';

describe('RolesPermissionsService', () => {
  let service: RolesPermissionsService;

  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [RolesPermissionsService, HttpClient, HttpHandler]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new RolesPermissionsService();
  });
  var test = 'Object';
  it('should be created', () => {
    expect(service).toBeTruthy();
    service.setRes(test)
    expect(service.getRes()).toBeDefined();
  });

});
