import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarConsultaComponent } from './cancelar-consulta.component';

describe('CancelarConsultaComponent', () => {
  let component: CancelarConsultaComponent;
  let fixture: ComponentFixture<CancelarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelarConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
