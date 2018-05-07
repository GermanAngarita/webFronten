import { TestBed, inject } from '@angular/core/testing';

import { ManagerGuardService } from './manager-guard.service';

describe('ManagerGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerGuardService]
    });
  });

  it('should be created', inject([ManagerGuardService], (service: ManagerGuardService) => {
    expect(service).toBeTruthy();
  }));
});
