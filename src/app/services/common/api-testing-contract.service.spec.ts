import { TestBed } from '@angular/core/testing';

import { ApiTestingContractService } from './api-testing-contract.service';

describe('ApiTestingContractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTestingContractService = TestBed.get(ApiTestingContractService);
    expect(service).toBeTruthy();
  });
});
