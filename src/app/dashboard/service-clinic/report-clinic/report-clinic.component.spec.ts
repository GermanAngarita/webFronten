import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportClinicComponent } from './report-clinic.component';

describe('ReportClinicComponent', () => {
  let component: ReportClinicComponent;
  let fixture: ComponentFixture<ReportClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
