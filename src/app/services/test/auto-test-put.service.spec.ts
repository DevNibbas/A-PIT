import { TestBed } from '@angular/core/testing';

import { AutoTestPutService } from './auto-test-put.service';

describe('AutoTestPutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoTestPutService = TestBed.get(AutoTestPutService);
    expect(service).toBeTruthy();
  });
});
