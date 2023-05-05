import { TestBed } from '@angular/core/testing';

import { ApiAxiosService } from './api-axios.service';

describe('ApiAxiosService', () => {
  let service: ApiAxiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAxiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
