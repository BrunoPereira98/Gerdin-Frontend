import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaInstalacoesComponent } from './consulta-instalacoes.component';

describe('ConsultaInstalacoesComponent', () => {
  let component: ConsultaInstalacoesComponent;
  let fixture: ComponentFixture<ConsultaInstalacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaInstalacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaInstalacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
