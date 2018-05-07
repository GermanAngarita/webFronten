import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClicnicComponent } from './create-clicnic.component';

describe('CreateClicnicComponent', () => {
  let component: CreateClicnicComponent;
  let fixture: ComponentFixture<CreateClicnicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClicnicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClicnicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
