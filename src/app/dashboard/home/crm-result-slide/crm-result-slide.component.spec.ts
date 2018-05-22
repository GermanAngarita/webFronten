import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmResultSlideComponent } from './crm-result-slide.component';

describe('CrmResultSlideComponent', () => {
  let component: CrmResultSlideComponent;
  let fixture: ComponentFixture<CrmResultSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmResultSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmResultSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
