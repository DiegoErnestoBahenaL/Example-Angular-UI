import { TestBed } from '@angular/core/testing';

import { BooksEndpointsService } from './books-endpoints.service';

describe('BooksEndpointsService', () => {
  let service: BooksEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
