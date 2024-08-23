import { TestBed } from '@angular/core/testing';

import { UsersEndpointsService } from './users-endpoints.service';

describe('UsersEndpointsService', () => {
  let service: UsersEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
