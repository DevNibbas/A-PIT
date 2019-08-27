import { TestBed } from '@angular/core/testing';

import { AutotestService } from './autotest.service';

describe('AutotestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutotestService = TestBed.get(AutotestService);
    expect(service).toBeTruthy();
  });
});
