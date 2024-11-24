import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProyectsComponent } from './dashboard-proyects.component';

describe('DashboardProyectsComponent', () => {
  let component: DashboardProyectsComponent;
  let fixture: ComponentFixture<DashboardProyectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProyectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
