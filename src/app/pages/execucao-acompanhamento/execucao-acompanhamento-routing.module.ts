import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecucaoAcompanhamentoComponent } from './execucao-acompanhamento.component';

const routes: Routes = [
  {
    path: '',
    component: ExecucaoAcompanhamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecucaoAcompanhamentoRoutingModule { }
