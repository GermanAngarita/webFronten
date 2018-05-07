import { TestBed, inject } from '@angular/core/testing';

import { CrmsurveysService } from './crmsurveys.service';

describe('CrmsurveysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrmsurveysService]
    });
  });

  it('should be created', inject([CrmsurveysService], (service: CrmsurveysService) => {
    expect(service).toBeTruthy();
  }));
});
