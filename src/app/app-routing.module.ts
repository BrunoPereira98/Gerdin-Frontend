import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'teste-comunicacao',
  //   loadChildren: () =>
  //     import('./pages/teste-comunicacao/teste-comunicacao.module').then(
  //       (m) => m.TesteComunicacaoModule
  //     ),
  // },
  // {
  //   path: 'consulta-instalacoes',
  //   loadChildren: () =>
  //     import('./pages/consulta-instalacoes/consulta-instalacoes.module').then(
  //       (m) => m.ConsultaInstalacoesModule
  //     ),
  // },
  // {
  //   path: 'nova-regra',
  //   loadChildren: () =>
  //     import('./pages/nova-regra/nova-regra.module').then(
  //       (m) => m.NovaRegraModule
  //     ),
  // },
  // {
  //   path: 'consulta-monitoramento',
  //   loadChildren: () =>
  //     import('./pages/monitoramento/monitoramento.module').then(
  //       (m) => m.MonitoramentoModule
  //     ),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
