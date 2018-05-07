import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpLoadsComponent } from './up-loads.component';

describe('UpLoadsComponent', () => {
  let component: UpLoadsComponent;
  let fixture: ComponentFixture<UpLoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpLoadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
