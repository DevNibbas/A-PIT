import { TestBed } from '@angular/core/testing';

import { AutomatedTestService } from './automated-test.service';

describe('AutomatedTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutomatedTestService = TestBed.get(AutomatedTestService);
    expect(service).toBeTruthy();
  });
});
