import { TestBed, inject } from '@angular/core/testing';

import { VioService } from './vio.service';

describe('VioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VioService]
    });
  });

  it('should be created', inject([VioService], (service: VioService) => {
    expect(service).toBeTruthy();
  }));
});
