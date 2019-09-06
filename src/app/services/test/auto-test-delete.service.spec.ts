import { TestBed } from '@angular/core/testing';

import { AutoTestDeleteService } from './auto-test-delete.service';

describe('AutoTestDeleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoTestDeleteService = TestBed.get(AutoTestDeleteService);
    expect(service).toBeTruthy();
  });
});
