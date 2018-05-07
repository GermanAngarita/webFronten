import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KascComponent } from './kasc.component';

describe('KascComponent', () => {
  let component: KascComponent;
  let fixture: ComponentFixture<KascComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KascComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KascComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
