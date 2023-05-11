import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';
import { CalculoRestricaoService } from './services/calculo-restricao.service';
import { FiltroComponent } from 'src/app/shared/components/filtro/filtro.component';
import { RetornoFiltro } from 'src/app/shared/components/filtro/models/retorno-filtro';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EstadoDaUsinaEnum } from 'src/app/shared/components/enums/estado-da-usina-enum';
import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { CalculoRestricaoDto } from './models/calculo-restricao-dto';
import { BaseResult } from 'src/app/shared/models/base-result';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-calculo-restricoes',
  templateUrl: './calculo-restricoes.component.html',
  styleUrls: ['./calculo-restricoes.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('rotated => default', animate('1000ms ease-out')),
      transition('default => rotated', animate('1000ms ease-in'))
    ])
  ]
})
export class CalculoRestricoesComponent {

  @ViewChild(FiltroComponent, { static: true }) filtro!: FiltroComponent;

  displayedColumns: string[] = ['UsinaConjuntoUsina.Fonte.Nome',
    'UsinaConjuntoUsina.Nome',
    'UsinaConjuntoUsina.Agente',
    'UsinaConjuntoUsina.Area',
    'UsinaConjuntoUsina.Conexao.Nome',
    'UsinaConjuntoUsina.PotenciaInstalada',
    'UsinaConjuntoUsina.GeracaoAtual.Geracao',
    'Icones',
    'ComandoOperacao.LimiteAtual',
    'NovoLimite',
    'UsinaConjuntoUsina.FluxoSaci.Valor',
    'ReducaoVerificada',
    'ValorCalculado',
    'UsinaConjuntoUsina.CondicaoOperacao.Nome',
    'ComandoOperacao.MotivoRestricao',
    'Opcao'];

  dataAtualizacao!: Date;

  state: string = 'default';

  finalizado: boolean = false;

  atualizaData: boolean = false;
  showSpinner: boolean = false;

  dataSource: MatTableDataSource<CalculoRestricaoDto> = new MatTableDataSource<CalculoRestricaoDto>([]);

  retornoFiltro!: RetornoFiltro;

  private _inLoadingIndividualSelection = new SelectionModel<number>(true, []);

  nmFluxo: string = '';

  dataAtualizacaoFluxo!: Date;

  public dados: CalculoRestricaoDto[] = [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private readonly service: CalculoRestricaoService,
    private readonly alert: AlertService,
    private readonly dateAdapter: DateAdapter<Date>
  ) { 
    this.dateAdapter.setLocale('pt-br');
  }

  private popularDataSource(res: CalculoRestricaoDto[]): Observable<boolean> {
    this.dataSource.data = res;
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'UsinaConjuntoUsina.Fonte.Nome':
          return item.UsinaConjuntoUsina.Fonte.Nome;
        case 'UsinaConjuntoUsina.Nome':
          return item.UsinaConjuntoUsina.Nome;
        case 'UsinaConjuntoUsina.Agente':
          return item.UsinaConjuntoUsina.Agente;
        case 'UsinaConjuntoUsina.Area':
          return item.UsinaConjuntoUsina.Area;
        case 'UsinaConjuntoUsina.Conexao.Nome':
          return item.UsinaConjuntoUsina.Conexao.Nome;
        case 'UsinaConjuntoUsina.PotenciaInstalada':
          return item.UsinaConjuntoUsina.PotenciaInstalada;
        case 'UsinaConjuntoUsina.GeracaoAtual.Geracao':
          return item.GeracaoInstalacao ? item.UsinaConjuntoUsina.GeracaoAtual.Geracao : null;
        case 'ComandoOperacao.LimiteAtual':
          return item.ComandoOperacao ? item.ComandoOperacao.LimiteAtual : null;
        case 'UsinaConjuntoUsina.CondicaoOperacao.Nome':
          return item.UsinaConjuntoUsina.CondicaoOperacao.Nome;
        case 'ComandoOperacao.MotivoRestricao':
          return item.ComandoOperacao ? item.ComandoOperacao.MotivoRestricao : null;
        case 'UsinaConjuntoUsina.FluxoSaci.Valor':
          return item.UsinaConjuntoUsina.FluxoSaci ? item.UsinaConjuntoUsina.FluxoSaci.Valor : null;
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;

    return of(true);
  }

  pesquisar(retornoFiltro: RetornoFiltro) {
    this.retornoFiltro = retornoFiltro;
    const vazio: CalculoRestricaoDto[] = [];
    this.popularDataSource(vazio).subscribe((item) => {
      // this.Motivo.setValue(null);

      this.service.obterDadosFiltrados(retornoFiltro.instalacaoFiltro, retornoFiltro.instalacaoExcecaoFiltro,
        retornoFiltro.areaFiltro, retornoFiltro.pontoConexaoFiltro, retornoFiltro.pontoConexaoExcecaoFiltro,
        retornoFiltro.condicaoOperacaoFiltro, retornoFiltro.tipoInstalacaoFiltro, retornoFiltro.agenteFiltro,
        retornoFiltro.motivoFiltro, retornoFiltro.geracaoMinimaFiltro, retornoFiltro.fluxoSACIFiltro,
        retornoFiltro.sensibilidadeFiltro, retornoFiltro.operadorMatematicoFiltro, '').subscribe((res) => {

          if (this.atualizaData == false) {
            this.atualizaData = true;
          }
          this.preparaDadosDataGrid(res, false);
        });
    });
  }

  private preparaDadosDataGrid(res: BaseResult<CalculoRestricaoDto[]>, sincronismo: boolean) {
    if (!sincronismo && res.warnings && res.warnings.length > 0) {
      res.warnings.forEach((alerta: any) => {
        this.alert.warn(alerta.ErrorMessage);
      });
    }

    if (res.content) {
      this.dados = [];
      res.content.forEach(item => {
        this.dados.push(new CalculoRestricaoDto(item));
      });

      let dataFluxo = null;
      let dataGeracao = new Date();
      let dataGeracaoRecente = dataGeracao;

      this.dados.forEach(reg => {
        if (reg.UsinaConjuntoUsina?.GeracaoAtual) {
          dataGeracao = new Date(reg.UsinaConjuntoUsina?.GeracaoAtual.UltimaCaptura);

          if (dataGeracao > dataGeracaoRecente) {
            dataGeracaoRecente = dataGeracao;
          }
        }

        if (reg.UsinaConjuntoUsina?.FluxoSaci) {
          dataFluxo = new Date(reg.UsinaConjuntoUsina?.FluxoSaci.UltimaCaptura);

          if (dataFluxo > this.dataAtualizacaoFluxo
            || !this.dataAtualizacaoFluxo) {
            this.dataAtualizacaoFluxo = dataFluxo;
          }
        }
      });

      if (this.atualizaData) {
        this.dataAtualizacao = dataGeracaoRecente;
        this.atualizaData = false;
      }

      this.nmFluxo = this.retornoFiltro.fluxoSACIFiltro?.length ? '(' + this.retornoFiltro.fluxoSACIFiltro[0].Descricao + ')' : '';
      this.popularDataSource(this.dados);
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
    let soma = 0;

    if (this.dataSource) {
      this.dataSource.data.forEach(item => {
        soma += Math.round(item.UsinaConjuntoUsina?.PotenciaInstalada ? item.UsinaConjuntoUsina?.PotenciaInstalada : 0);
      });
    }

    return soma;
  }

  obterTotalGeracaoAtual() {
    let soma = 0;

    if (this.dataSource) {
      this.dataSource.data.forEach(item => {
        soma += Math.round(item.UsinaConjuntoUsina?.GeracaoAtual.Geracao ? item.UsinaConjuntoUsina?.GeracaoAtual.Geracao : 0);
      });
    }

    return soma;
  }

  atualizarManual() {
    this.atualizarDadosSincronismo();
  }

  private atualizarDadosSincronismo() {
    this.showSpinner = true;
    this.atualizaData = true;
    this.service.atualizarGeracao(this.retornoFiltro.instalacaoFiltro, this.retornoFiltro.instalacaoExcecaoFiltro,
      this.retornoFiltro.areaFiltro, this.retornoFiltro.pontoConexaoFiltro, this.retornoFiltro.pontoConexaoExcecaoFiltro,
      this.retornoFiltro.condicaoOperacaoFiltro, this.retornoFiltro.tipoInstalacaoFiltro, this.retornoFiltro.agenteFiltro,
      this.retornoFiltro.motivoFiltro, this.retornoFiltro.geracaoMinimaFiltro, this.retornoFiltro.fluxoSACIFiltro,
      this.retornoFiltro.sensibilidadeFiltro, this.retornoFiltro.operadorMatematicoFiltro).subscribe((res) => {

        this.service.atualizarFluxos(this.retornoFiltro.instalacaoFiltro, this.retornoFiltro.instalacaoExcecaoFiltro,
          this.retornoFiltro.areaFiltro, this.retornoFiltro.pontoConexaoFiltro, this.retornoFiltro.pontoConexaoExcecaoFiltro,
          this.retornoFiltro.condicaoOperacaoFiltro, this.retornoFiltro.tipoInstalacaoFiltro, this.retornoFiltro.agenteFiltro,
          this.retornoFiltro.motivoFiltro, this.retornoFiltro.geracaoMinimaFiltro, this.retornoFiltro.fluxoSACIFiltro,
          this.retornoFiltro.sensibilidadeFiltro, this.retornoFiltro.operadorMatematicoFiltro).subscribe((res) => {

            this.service.obterDadosFiltrados(this.retornoFiltro.instalacaoFiltro, this.retornoFiltro.instalacaoExcecaoFiltro,
              this.retornoFiltro.areaFiltro, this.retornoFiltro.pontoConexaoFiltro, this.retornoFiltro.pontoConexaoExcecaoFiltro,
              this.retornoFiltro.condicaoOperacaoFiltro, this.retornoFiltro.tipoInstalacaoFiltro, this.retornoFiltro.agenteFiltro,
              this.retornoFiltro.motivoFiltro, this.retornoFiltro.geracaoMinimaFiltro, this.retornoFiltro.fluxoSACIFiltro,
              this.retornoFiltro.sensibilidadeFiltro, this.retornoFiltro.operadorMatematicoFiltro, '').subscribe((res) => {
                this.preparaDadosDataGrid(res, false);
                this.alert.success('Atualização concluida com sucesso');
                this.showSpinner = false;
              }, (error: any) => {
                this.alert.error(error, 'Falha ao obter os registros atualizados');
                this.showSpinner = false;
              });
          }, (error: any) => {
            this.alert.error(error, 'Falha ao atualizar fluxos');
            this.showSpinner = false;
          });
      }, (error: any) => {
        this.alert.error(error, 'Falha ao atualizar gerações');
        this.showSpinner = false;
      });
  }

  obterCorBordaEstado(element: CalculoRestricaoDto) {
    if (!element.ComandoOperacao
      || !element.ComandoOperacao.CondicaoOperacao) {
      return 'EstadoPadrao';
    }
    switch (element.ComandoOperacao.CondicaoOperacao.Id) {
      case EstadoDaUsinaEnum.RUIM:
        return 'EstadoRuim';
      case EstadoDaUsinaEnum.ATENCAO:
        return 'EstadoAtencao';
      default:
        return 'EstadoPadrao';
    }
  }

  obterCorTooltipEstado(element: CalculoRestricaoDto) {
    if (!element.ComandoOperacao
      || !element.ComandoOperacao.CondicaoOperacao) {
      return 'TEstadoPadrao';
    }
    switch (element.ComandoOperacao.CondicaoOperacao.Id) {
      case EstadoDaUsinaEnum.RUIM:
        return 'TEstadoRuim';
      case EstadoDaUsinaEnum.ATENCAO:
        return 'TEstadoAtencao';
      default:
        return 'TEstadoPadrao';
    }
  }

  inLoadingIndividual(item: CalculoRestricaoDto): boolean {
    return this._inLoadingIndividualSelection.isSelected(item && item.UsinaConjuntoUsina ? item.UsinaConjuntoUsina?.Id : 0);
  }

  obterTotalLimiteAtual() {
    let soma = 0;

    if (this.dataSource) {
      this.dataSource.data.forEach(item => {
        soma += Math.round(item.ComandoOperacao?.LimiteAtual ? item.ComandoOperacao?.LimiteAtual : 0);
      });
    }

    return soma;
  }

  obterTotalNovoLimite() {
    let soma = 0;

    if (this.dataSource) {
      this.dataSource.data.forEach(item => {
        soma += Math.round(item.NovoLimite ? item.NovoLimite : 0);
      });
    }

    return soma;
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
    let soma = 0;

    if (this.dataSource) {
      this.dataSource.data.forEach(item => {
        soma += Math.round(item.ReducaoVerificada ? item.ReducaoVerificada : 0);
      });
    }

    return soma;
  }

  obterTotalValorCalculado() {
    let soma = 0;

    if (this.dataSource) {
      this.dataSource.data.forEach(item => {
        soma += Math.round(item.ValorCalculado ? item.ValorCalculado : 0);
      });
    }

    return soma;
  }

  excluir(element: CalculoRestricaoDto) {
    this.alert.success('Linha Excluída com Sucesso', 'Excusão de linhas');
    const array = this.dataSource.data;
    const index = this.dataSource.data.findIndex(d => d === element);
    array.splice(index, 1);
    this.dataSource.data = array;
  }

}
