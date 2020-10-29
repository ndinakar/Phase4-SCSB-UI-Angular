import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ HomeComponent ],
      providers: [FormBuilder],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('Testing Fields', () => {
    expect(component.submitted).toBe(false);
    expect(component.Institution).toBeInstanceOf;
    const spy=spyOn(component,'onSubmit');
    component.ngOnInit();
    //expect(component.onSubmit()).toHaveBeenCalled();
    //expect(spy).toHaveBeenCalled();
  });
});
