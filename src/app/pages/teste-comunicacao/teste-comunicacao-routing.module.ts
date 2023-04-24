import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesteComunicacaoComponent } from './teste-comunicacao.component';

const routes: Routes = [
  {
    path: '',
    component: TesteComunicacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesteComunicacaoRoutingModule { }
