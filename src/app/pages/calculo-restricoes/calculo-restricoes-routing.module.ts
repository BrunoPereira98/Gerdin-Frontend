import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculoRestricoesComponent } from './calculo-restricoes.component';

const routes: Routes = [
  {
    path: '',
    component: CalculoRestricoesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculoRestricoesRoutingModule { }
