import { TestBed } from '@angular/core/testing';

import { BulkRequestService } from './bulk-request.service';

describe('BulkRequestService', () => {
  let service: BulkRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
