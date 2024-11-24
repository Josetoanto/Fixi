import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFixiComponent } from './search-fixi.component';

describe('SearchFixiComponent', () => {
  let component: SearchFixiComponent;
  let fixture: ComponentFixture<SearchFixiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFixiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFixiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
