import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DashBoardService } from 'src/app/services/dashBoard/dash-board.service';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;
  let service: DashBoardService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [DashBoardService, HttpClient, HttpHandler]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new DashBoardService(httpClientSpy as any);
    component = new FooterComponent(service);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
