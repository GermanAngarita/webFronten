import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdviserComponent } from './home-adviser.component';

describe('HomeAdviserComponent', () => {
  let component: HomeAdviserComponent;
  let fixture: ComponentFixture<HomeAdviserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAdviserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
