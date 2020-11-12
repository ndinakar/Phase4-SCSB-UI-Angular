import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMarcComponent } from './open-marc.component';

describe('OpenMarcComponent', () => {
  let component: OpenMarcComponent;
  let fixture: ComponentFixture<OpenMarcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMarcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenMarcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
