import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KacsDealerSlideComponent } from './kacs-dealer-slide.component';

describe('KacsDealerSlideComponent', () => {
  let component: KacsDealerSlideComponent;
  let fixture: ComponentFixture<KacsDealerSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KacsDealerSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KacsDealerSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
