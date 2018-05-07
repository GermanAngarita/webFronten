import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VioUwComponent } from './vio-uw.component';

describe('VioUwComponent', () => {
  let component: VioUwComponent;
  let fixture: ComponentFixture<VioUwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VioUwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VioUwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
