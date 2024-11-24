import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFixisPageComponent } from './admin-fixis-page.component';

describe('AdminFixisPageComponent', () => {
  let component: AdminFixisPageComponent;
  let fixture: ComponentFixture<AdminFixisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFixisPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFixisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
