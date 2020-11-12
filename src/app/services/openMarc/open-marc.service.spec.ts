import { TestBed } from '@angular/core/testing';

import { OpenMarcService } from './open-marc.service';

describe('OpenMarcService', () => {
  let service: OpenMarcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenMarcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
