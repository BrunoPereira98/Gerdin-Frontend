import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'teste-comunicacao',
    title: 'Teste de comunicação',
    loadChildren: () =>
      import('./pages/teste-comunicacao/teste-comunicacao.module').then(
        (m) => m.TesteComunicacaoModule
      ),
  },
  {
    path: 'consulta-instalacoes',
    title: 'Consulta Instalações',
    loadChildren: () =>
      import('./pages/consulta-instalacoes/consulta-instalacoes.module').then(
        (m) => m.ConsultaInstalacoesModule
      ),
  },
  {
    path: 'calculo-restricoes',
    title: 'Cálculo de Restrições',
    loadChildren: () =>
      import('./pages/calculo-restricoes/calculo-restricoes.module').then(
        (m) => m.CalculoRestricoesModule
      ),
  },
  {
    path: 'execucao-acompanhamento',
    title: 'Execução/Acompanhamento',
    loadChildren: () =>
      import('./pages/execucao-acompanhamento/execucao-acompanhamento.module').then(
        (m) => m.ExecucaoAcompanhamentoModule
      ),
  },
  {
    path: 'relatorios',
    title: 'Relatórios',
    loadChildren: () =>
      import('./pages/relatorios/relatorios.module').then(
        (m) => m.RelatoriosModule
      ),
  },
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
