import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrftDealerSlideComponent } from './frft-dealer-slide.component';

describe('FrftDealerSlideComponent', () => {
  let component: FrftDealerSlideComponent;
  let fixture: ComponentFixture<FrftDealerSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrftDealerSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrftDealerSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
