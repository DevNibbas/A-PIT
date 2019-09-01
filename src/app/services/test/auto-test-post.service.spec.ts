import { TestBed } from '@angular/core/testing';

import { AutoTestPostService } from './auto-test-post.service';

describe('AutoTestPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoTestPostService = TestBed.get(AutoTestPostService);
    expect(service).toBeTruthy();
  });
});
