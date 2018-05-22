import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionSlideComponent } from './satisfaction-slide.component';

describe('SatisfactionSlideComponent', () => {
  let component: SatisfactionSlideComponent;
  let fixture: ComponentFixture<SatisfactionSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatisfactionSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatisfactionSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
