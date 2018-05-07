import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceClinicComponent } from './service-clinic.component';

describe('ServiceClinicComponent', () => {
  let component: ServiceClinicComponent;
  let fixture: ComponentFixture<ServiceClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
