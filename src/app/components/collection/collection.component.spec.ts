import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { CollectionComponent } from './collection.component';


describe('CollectionComponent', () => {
  let fixture: ComponentFixture<CollectionComponent>;
  let component: CollectionComponent;
  let service: CollectionService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let formBuilder: FormBuilder;
  let spinner: NgxSpinnerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [CollectionService, HttpClient, HttpHandler, FormBuilder]

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
