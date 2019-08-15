import { TestBed } from '@angular/core/testing';

import { ApiKeyService } from './api-key.service';

describe('ApiKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiKeyService = TestBed.get(ApiKeyService);
    expect(service).toBeTruthy();
  });
});
