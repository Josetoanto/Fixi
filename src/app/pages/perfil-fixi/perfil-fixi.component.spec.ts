import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFixiComponent } from './perfil-fixi.component';

describe('PerfilFixiComponent', () => {
  let component: PerfilFixiComponent;
  let fixture: ComponentFixture<PerfilFixiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilFixiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilFixiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
