import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMaintenanceComponent } from './load-maintenance.component';

describe('LoadMaintenanceComponent', () => {
  let component: LoadMaintenanceComponent;
  let fixture: ComponentFixture<LoadMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
