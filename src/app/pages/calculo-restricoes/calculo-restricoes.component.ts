import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CalculoRestricaoModel } from './models/calculo-restricao-model';
import { Observable, of } from 'rxjs';
import { CalculosRestricoesModel } from './models/calculos-restricoes-model';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';
import { CalculoRestricaoService } from './services/calculo-restricao.service';
import { FiltroComponent } from 'src/app/shared/components/filtro/filtro.component';
import { RetornoFiltro } from 'src/app/shared/components/filtro/models/retorno-filtro';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { EstadoDaUsinaEnum } from 'src/app/shared/components/enums/estado-da-usina-enum';
import { SelectionModel } from '@angular/cdk/collections';
import {DatePipe, DecimalPipe, formatDate, registerLocaleData} from '@angular/common';

@Component({
  selector: 'app-calculo-restricoes',
  templateUrl: './calculo-restricoes.component.html',
  styleUrls: ['./calculo-restricoes.component.scss'],
  animations: [
    trigger('rotatedState', [
        state('default', style({transform: 'rotate(0)'})),
        state('rotated', style({transform: 'rotate(360deg)'})),
        transition('rotated => default', animate('1000ms ease-out')),
        transition('default => rotated', animate('1000ms ease-in'))
    ])
]
})
export class CalculoRestricoesComponent {

  @ViewChild(FiltroComponent, {static: true}) filtro!: FiltroComponent;

  displayedColumns: string[] = ['TipoInstalacao.Nome',
        'NomeInstalacao',
        'Agente',
        'Area',
        'SiglaConexao',
        'PotenciaInstalada',
        'GeracaoInstalacao.GeracaoAtual',
        'Icones',
        'ComandoOperacao.LimiteAtual',
        'NovoLimite',
        'Fluxo.Valor',
        'ReducaoVerificada',
        'ValorCalculado',
        'CondicaoOperacao',
        // 'Fluxo.Description',
        'Motivo',
        'Opcao'];

  dataAtualizacao!: Date;

  state: string = 'default';

  finalizado: boolean = false;

  atualizaData: boolean = false;
  showSpinner: boolean = false;

  dataSource: MatTableDataSource<CalculoRestricaoModel> = new MatTableDataSource<CalculoRestricaoModel>([]);

  retornoFiltro!: RetornoFiltro;

  private _inLoadingIndividualSelection = new SelectionModel<number>(true, []);

  nmFluxo: string = '';

  dataAtualizacaoFluxo!: Date;

  constructor(
    private readonly service: CalculoRestricaoService,
    private readonly alert: AlertService
  ) {}

  

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
    this.retornoFiltro = retornoFiltro;
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
            this.alert.warn(alerta.ErrorMessage);
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

  obterTotalPotencial() {
    if (this.dataSource) {
        return Math.round(this.dataSource.data.map(i => i.PotenciaInstalada).reduce((accumulator, obj) => {
            return accumulator + obj;
        }, 0));
    } else {
        return 0;
    }
  }

  obterTotalGeracaoAtual() {
    if (this.dataSource) {
        return Math.round(this.dataSource.data.map(i => i.GeracaoInstalacao.GeracaoAtual).reduce((accumulator, obj) => {
            return accumulator + obj;
        }, 0));
    } else {
        return 0;
    }
  }

  atualizarManual() {
    this.atualizarDadosSincronismo();
  }

  private atualizarDadosSincronismo() {
    this.showSpinner = true;
    this.atualizaData = true;
    this.service.atualizarDadosSincronismo(this.retornoFiltro.instalacaoFiltro, this.retornoFiltro.instalacaoExcecaoFiltro,
      this.retornoFiltro.areaFiltro, this.retornoFiltro.pontoConexaoFiltro, this.retornoFiltro.pontoConexaoExcecaoFiltro,
      this.retornoFiltro.condicaoOperacaoFiltro, this.retornoFiltro.tipoInstalacaoFiltro, this.retornoFiltro.agenteFiltro,
      this.retornoFiltro.motivoFiltro, this.retornoFiltro.geracaoMinimaFiltro, this.retornoFiltro.fluxoSACIFiltro,
      this.retornoFiltro.sensibilidadeFiltro, this.retornoFiltro.operadorMatematicoFiltro, '-Fluxo.Valor').subscribe((res) => {
        this.showSpinner = false;
        this.preparaDadosDataGrid(res, true);
    });
  }

  obterCorBordaEstado(element: CalculoRestricaoModel) {
    if (!element.ComandoOperacao
        || !element.ComandoOperacao.EstadoDaUsina) {
        return 'EstadoPadrao';
    }
    switch (element.ComandoOperacao.EstadoDaUsina) {
        case EstadoDaUsinaEnum.RUIM:
            return 'EstadoRuim';
        case EstadoDaUsinaEnum.ATENCAO:
            return 'EstadoAtencao';
        default:
            return 'EstadoPadrao';
    }
  }

  obterCorTooltipEstado(element: CalculoRestricaoModel) {
    if (!element.ComandoOperacao
        || !element.ComandoOperacao.EstadoDaUsina) {
        return 'TEstadoPadrao';
    }
    switch (element.ComandoOperacao.EstadoDaUsina) {
        case EstadoDaUsinaEnum.RUIM:
            return 'TEstadoRuim';
        case EstadoDaUsinaEnum.ATENCAO:
            return 'TEstadoAtencao';
        default:
            return 'TEstadoPadrao';
    }
  }

  inLoadingIndividual(item: CalculoRestricaoModel): boolean {
    return this._inLoadingIndividualSelection.isSelected(item ? item.IdUsinaConjuntoUsina : 0);
  }

  private itemId(item: { IdUsinaConjuntoUsina: number }) {
    return item ? item.IdUsinaConjuntoUsina : void 0;
  }

  obterTotalLimiteAtual() {
    if (this.dataSource) {
        let total = 0;
        this.dataSource.data.forEach(item => {
            if (item.ComandoOperacao) {
                total += Math.round(item.ComandoOperacao.LimiteAtual);
            }
        });
        return total;
    } else {
        return 0;
    }
  }

  obterTotalNovoLimite() {
    if (this.dataSource) {
        return this.dataSource.data.map(i => i.NovoLimite).reduce((accumulator, obj) => {
            return accumulator + (!isNaN(obj) ? obj : 0);
        }, 0);
    } else {
        return 0;
    }
  }

  obterFluxoFiltro() {
    return this.nmFluxo;
  }

  formatarData(data: Date, formato: string = 'dd/MM/yyyy HH:mm') {
    if (data) {
        try {
            return formatDate(data, formato, 'pt-BR');
        } catch (error) {
            return '';
        }
    }
    return '';
  }

  obterTotalReducaoVerif() {
    if (this.dataSource) {
        return this.dataSource.data.map(x => x.ReducaoVerificada)
            .reduce((previusValue, currentValue) => {
                return previusValue + (!isNaN(currentValue) ? + 
                currentValue : 0);
            }, 0);
    } else {
        return 0;
    }
  }

  obterTotalValorCalculado() {
    if (this.dataSource) {
        return Math.round(this.dataSource.data.map(i => i.ValorCalculado).reduce((accumulator, obj) => {
            return accumulator + (!isNaN(obj) ? obj : 0);
        }, 0));
    } else {
        return 0;
    }
  }

  excluir(element: CalculoRestricaoModel) {
    this.alert.info('Linha Excluída com Sucesso', 'Excusão de linhas');
    const array = this.dataSource.data;
    const index = this.dataSource.data.findIndex(d => d === element);
    array.splice(index, 1);
    this.dataSource.data = array;
  }

}
