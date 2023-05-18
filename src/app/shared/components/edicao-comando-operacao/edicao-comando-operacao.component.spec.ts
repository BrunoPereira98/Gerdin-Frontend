import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoComandoOperacaoComponent } from './edicao-comando-operacao.component';

describe('EdicaoComandoOperacaoComponent', () => {
  let component: EdicaoComandoOperacaoComponent;
  let fixture: ComponentFixture<EdicaoComandoOperacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoComandoOperacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicaoComandoOperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
