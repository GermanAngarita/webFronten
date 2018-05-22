import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyDealerSlideComponent } from './loyalty-dealer-slide.component';

describe('LoyaltyDealerSlideComponent', () => {
  let component: LoyaltyDealerSlideComponent;
  let fixture: ComponentFixture<LoyaltyDealerSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyDealerSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyDealerSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
