import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralVioComponent } from './general-vio.component';

describe('GeneralVioComponent', () => {
  let component: GeneralVioComponent;
  let fixture: ComponentFixture<GeneralVioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralVioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralVioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
