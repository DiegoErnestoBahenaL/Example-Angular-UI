import { TestBed } from '@angular/core/testing';

import { TasksEndpointsService } from './tasks-endpoints.service';

describe('TasksEndpointsService', () => {
  let service: TasksEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
