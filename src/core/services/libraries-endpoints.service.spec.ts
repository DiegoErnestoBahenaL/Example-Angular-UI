import { TestBed } from '@angular/core/testing';

import { LibrariesEndpointsService } from './libraries-endpoints.service';

describe('LibrariesEndpointsService', () => {
  let service: LibrariesEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrariesEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
