import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaInstalacoesComponent } from './consulta-instalacoes.component';


const routes: Routes = [
  {
    path: '',
    component: ConsultaInstalacoesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaInstalacoesRoutingModule { }
