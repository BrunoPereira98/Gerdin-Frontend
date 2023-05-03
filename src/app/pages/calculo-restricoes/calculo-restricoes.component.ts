import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CalculoRestricaoModel } from './models/calculo-restricao-model';
import { Observable, of } from 'rxjs';
import { CalculosRestricoesModel } from './models/calculos-restricoes-model';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';
import { CalculoRestricaoService } from './services/calculo-restricao.service';
import { FiltroComponent } from 'src/app/shared/components/filtro/filtro.component';
import { RetornoFiltro } from 'src/app/shared/components/filtro/models/retorno-filtro';

@Component({
  selector: 'app-calculo-restricoes',
  templateUrl: './calculo-restricoes.component.html',
  styleUrls: ['./calculo-restricoes.component.scss']
})
export class CalculoRestricoesComponent {

  @ViewChild(FiltroComponent, {static: true}) filtro!: FiltroComponent;

  constructor(
    private readonly service: CalculoRestricaoService,
    private readonly alert: AlertService,
  ) {}

  finalizado: boolean = false;

  dataSource: MatTableDataSource<CalculoRestricaoModel> = new MatTableDataSource<CalculoRestricaoModel>([]);

  private popularDataSource(res: CalculoRestricaoModel[]): Observable<boolean> {
    this.dataSource.data = res;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sortingDataAccessor = (item, property) => {
    //     switch (property) {
    //         case 'TipoInstalacao.Nome':
    //             return item.TipoInstalacao.Nome;
    //         case 'GeracaoInstalacao.GeracaoAtual':
    //             return item.GeracaoInstalacao ? item.GeracaoInstalacao.GeracaoAtual : null;
    //         case 'ComandoOperacao.LimiteAtual':
    //             return item.ComandoOperacao ? item.ComandoOperacao.LimiteAtual : null;
    //         case 'Motivo':
    //             return item.ComandoOperacao ? item.ComandoOperacao.Motivo : null;
    //         case 'Fluxo.Valor':
    //             return item.Fluxo ? item.Fluxo.Valor : null;
    //         default:
    //             return item[property];
    //     }
    // };
    // this.dataSource.sort = this.sort;

    return of(true);
  }

  pesquisar(retornoFiltro: RetornoFiltro) {
    const vazio: any[] = [];
    this.popularDataSource(vazio).subscribe((item) => {
        // this.Motivo.setValue(null);
        // this.orderBy = ['-Fluxo.Valor'];

        this.service.obterDadosFiltrados(retornoFiltro.instalacaoFiltro, retornoFiltro.instalacaoExcecaoFiltro,
            retornoFiltro.areaFiltro, retornoFiltro.pontoConexaoFiltro, retornoFiltro.pontoConexaoExcecaoFiltro,
            retornoFiltro.condicaoOperacaoFiltro, retornoFiltro.tipoInstalacaoFiltro, retornoFiltro.agenteFiltro,
            retornoFiltro.motivoFiltro, retornoFiltro.geracaoMinimaFiltro, retornoFiltro.fluxoSACIFiltro,
            retornoFiltro.sensibilidadeFiltro, retornoFiltro.operadorMatematicoFiltro, '-Fluxo.Valor').subscribe((res) => {

            // if (this.atualizaData == false) {
            //     this.atualizaData = true;
            // }
            this.preparaDadosDataGrid(res, false);
        });
    });
  }

  private preparaDadosDataGrid(res: CalculosRestricoesModel, sincronismo: boolean) {
    if (!sincronismo && res.warnings && res.warnings.length > 0) {
        res.warnings.forEach(alerta => {
            // this.alert.warn(alerta.ErrorMessage);
        });
    }
    // this.dados = res.content?.Resultados;
    let maxDate = null;

    // if (this.atualizaData) {
    //     this.dataAtualizacao = res.content.DataDaUltimaAtualizacao;
    //     this.atualizaData = false;
    // }

    // if (this.dados) {
    //     try {
    //         maxDate = new Date(
    //             Math.max(
    //                 ...this.dados.map(i => {
    //                     return new Date(i.Fluxo.UltimaCaptura);
    //                 }),
    //             ),
    //         );
    //     } catch (e) {
    //         maxDate = null;
    //     }
    //     this.dataAtualizacaoFluxo = maxDate;
    //     this.nmFluxo = this.filtro.fluxoSACIFiltro[0] ? '(' + this.filtro.fluxoSACIFiltro[0].value + ')' : '';
    // }
    if (res.content && res.content.Resultados) {
      this.popularDataSource(res.content.Resultados);
    }
  }

  atualizar(value: boolean) {
    this.finalizado = value;
  }

  isFinalizado() {
    return this.finalizado
        && 'N' !== sessionStorage.getItem('isPesquisou');
  }
  
}
