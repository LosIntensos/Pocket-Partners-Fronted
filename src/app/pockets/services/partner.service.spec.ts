import { TestBed } from '@angular/core/testing';

import { PartnerService } from './Partner.service';

describe('PoparternsService', () => {
  let service: PartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
