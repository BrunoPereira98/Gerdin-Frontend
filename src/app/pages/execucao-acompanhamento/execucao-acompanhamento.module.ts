import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ExecucaoAcompanhamentoComponent } from './execucao-acompanhamento.component';
import { ExecucaoAcompanhamentoRoutingModule } from './execucao-acompanhamento-routing.module';
import { TotalizadorAgenteComponent } from './componentes/totalizador-agente/totalizador-agente.component';
import { BalancoDiarioComponent } from './componentes/balanco-diario/balanco-diario.component';
import { CommonModule } from '@angular/common';
import { HistoricoCorteComponent } from './componentes/historico-corte/historico-corte.component';

@NgModule({
  declarations: [
    ExecucaoAcompanhamentoComponent,
    TotalizadorAgenteComponent,
    BalancoDiarioComponent,
    HistoricoCorteComponent
  ],
  imports: [
    MatCommonModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ExecucaoAcompanhamentoRoutingModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always', appearance: 'outline' },
    },
  ],
})
export class ExecucaoAcompanhamentoModule { }
