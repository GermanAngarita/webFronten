import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KacsResultSlideComponent } from './kacs-result-slide.component';

describe('KacsResultSlideComponent', () => {
  let component: KacsResultSlideComponent;
  let fixture: ComponentFixture<KacsResultSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KacsResultSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KacsResultSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
