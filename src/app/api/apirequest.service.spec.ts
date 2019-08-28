import { TestBed } from '@angular/core/testing';

import { ApirequestService } from './apirequest.service';

describe('ApirequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApirequestService = TestBed.get(ApirequestService);
    expect(service).toBeTruthy();
  });
});
