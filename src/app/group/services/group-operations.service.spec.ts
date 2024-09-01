import { TestBed } from '@angular/core/testing';

import { GroupOperationsService } from './group-operations.service';

describe('GroupOperationsService', () => {
  let service: GroupOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
