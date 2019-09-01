import { TestBed } from '@angular/core/testing';

import { StringGeneratorService } from './string-generator.service';

describe('StringGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StringGeneratorService = TestBed.get(StringGeneratorService);
    expect(service).toBeTruthy();
  });
});
