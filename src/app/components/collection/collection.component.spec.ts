import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { CollectionComponent } from './collection.component';


describe('CollectionComponent', () => {
  let fixture: ComponentFixture<CollectionComponent>;
  let component: CollectionComponent;
  let service: CollectionService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let formBuilder: UntypedFormBuilder;
  let spinner: NgxSpinnerService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [CollectionService, HttpClient, HttpHandler, UntypedFormBuilder]

    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new CollectionService(httpClientSpy as any);
    component = new CollectionComponent(formBuilder, service, spinner);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
