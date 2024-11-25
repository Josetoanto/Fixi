import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixiPerfilComponent } from './fixi-perfil.component';

describe('FixiPerfilComponent', () => {
  let component: FixiPerfilComponent;
  let fixture: ComponentFixture<FixiPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixiPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixiPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
