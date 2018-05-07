import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicDatailsComponent } from './clinic-datails.component';

describe('ClinicDatailsComponent', () => {
  let component: ClinicDatailsComponent;
  let fixture: ComponentFixture<ClinicDatailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicDatailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
