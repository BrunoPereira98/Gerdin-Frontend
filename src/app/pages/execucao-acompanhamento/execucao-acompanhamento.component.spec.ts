import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecucaoAcompanhamentoComponent } from './execucao-acompanhamento.component';

describe('ExecucaoAcompanhamentoComponent', () => {
  let component: ExecucaoAcompanhamentoComponent;
  let fixture: ComponentFixture<ExecucaoAcompanhamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecucaoAcompanhamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecucaoAcompanhamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
