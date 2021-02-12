import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/services/login/login.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let service: LoginService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [LoginService, HttpClient, HttpHandler]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new LoginService(httpClientSpy as any);
    component = new HomeComponent(service);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
