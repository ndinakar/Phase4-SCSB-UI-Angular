import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulkrequestComponent } from './bulkrequest.component';

describe('BulkrequestComponent', () => {
  let component: BulkrequestComponent;
  let fixture: ComponentFixture<BulkrequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BulkrequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
