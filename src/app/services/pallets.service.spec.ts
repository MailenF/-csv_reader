import { TestBed } from '@angular/core/testing';

import { PalletsService } from './pallets.service';

describe('PalletsService', () => {
  let service: PalletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
