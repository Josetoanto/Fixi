import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFixiComponent } from './header-fixi.component';

describe('HeaderFixiComponent', () => {
  let component: HeaderFixiComponent;
  let fixture: ComponentFixture<HeaderFixiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderFixiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFixiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
