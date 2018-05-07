import { TestBed, inject } from '@angular/core/testing';

import { VinsService } from './vins.service';

describe('VinsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VinsService]
    });
  });

  it('should be created', inject([VinsService], (service: VinsService) => {
    expect(service).toBeTruthy();
  }));
});
