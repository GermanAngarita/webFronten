import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVinComponent } from './search-vin.component';

describe('SearchVinComponent', () => {
  let component: SearchVinComponent;
  let fixture: ComponentFixture<SearchVinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
