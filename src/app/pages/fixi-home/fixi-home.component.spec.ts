import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixiHomeComponent } from './fixi-home.component';

describe('FixiHomeComponent', () => {
  let component: FixiHomeComponent;
  let fixture: ComponentFixture<FixiHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixiHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
