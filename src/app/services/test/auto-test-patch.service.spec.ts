import { TestBed } from '@angular/core/testing';

import { AutoTestPatchService } from './auto-test-patch.service';

describe('AutoTestPatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoTestPatchService = TestBed.get(AutoTestPatchService);
    expect(service).toBeTruthy();
  });
});
