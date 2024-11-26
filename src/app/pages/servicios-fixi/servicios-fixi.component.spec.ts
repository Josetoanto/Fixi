import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosFixiComponent } from './servicios-fixi.component';

describe('ServiciosFixiComponent', () => {
  let component: ServiciosFixiComponent;
  let fixture: ComponentFixture<ServiciosFixiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosFixiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosFixiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
