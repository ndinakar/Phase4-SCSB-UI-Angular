import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkrequestComponent } from './bulkrequest.component';

describe('BulkrequestComponent', () => {
  let component: BulkrequestComponent;
  let fixture: ComponentFixture<BulkrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
