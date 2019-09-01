import { TestBed } from '@angular/core/testing';

import { AutoTestGetService } from './auto-test-get.service';

describe('AutoTestGetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoTestGetService = TestBed.get(AutoTestGetService);
    expect(service).toBeTruthy();
  });
});
