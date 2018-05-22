import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcsiComponent } from './dcsi.component';

describe('DcsiComponent', () => {
  let component: DcsiComponent;
  let fixture: ComponentFixture<DcsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
