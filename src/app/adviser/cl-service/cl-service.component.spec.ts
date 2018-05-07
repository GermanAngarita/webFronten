import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClServiceComponent } from './cl-service.component';

describe('ClServiceComponent', () => {
  let component: ClServiceComponent;
  let fixture: ComponentFixture<ClServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
