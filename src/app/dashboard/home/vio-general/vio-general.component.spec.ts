import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VioGeneralComponent } from './vio-general.component';

describe('VioGeneralComponent', () => {
  let component: VioGeneralComponent;
  let fixture: ComponentFixture<VioGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VioGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
