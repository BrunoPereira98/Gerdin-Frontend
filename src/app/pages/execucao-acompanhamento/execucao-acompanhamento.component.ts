import { Component, OnInit, ViewChild } from '@angular/core';
import { TotalizadorAgenteComponent } from './componentes/totalizador-agente/totalizador-agente.component';
import { ExecucaoAcompanhamentoService } from './services/execucao-acompanhamento.service';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';
import { BalancoDiarioComponent } from './componentes/balanco-diario/balanco-diario.component';
import { BaseResult } from 'src/app/shared/models/base-result';
import { CorteCadastradoDto } from './models/corte-cadastrado-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { ComandoOperacaoModel } from 'src/app/shared/models/comando-operacao-model';
import { Observable, Subscription, finalize, switchMap, timer } from 'rxjs';
import { StatusSinapseEnum } from 'src/app/shared/components/enums/status-sinapse-enum';
import { EstadoDaUsinaEnum } from 'src/app/shared/components/enums/estado-da-usina-enum';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PerfilEnum } from 'src/app/shared/components/enums/perfil-enum';
import { MatDialog } from '@angular/material/dialog';
import { HistoricoCorteComponent } from './componentes/historico-corte/historico-corte.component';
import { EdicaoComandoOperacaoComponent } from 'src/app/shared/components/edicao-comando-operacao/edicao-comando-operacao.component';
import { EdicaoComandoOperacaoParams } from 'src/app/shared/components/edicao-comando-operacao/models/edicao-comando-operacao-params';

@Component({
  selector: 'app-execucao-acompanhamento',
  templateUrl: './execucao-acompanhamento.component.html',
  styleUrls: ['./execucao-acompanhamento.component.scss'],
  animations: [
    trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('rotatedState', [
        state('default', style({ transform: 'rotate(0)' })),
        state('rotated', style({ transform: 'rotate(360deg)' })),
        transition('rotated => default', animate('1000ms ease-out')),
        transition('default => rotated', animate('1000ms ease-in'))
    ])
],
})
export class ExecucaoAcompanhamentoComponent  implements OnInit {

  finalizado = false;

  finalizadoEntrada = false;
  
  @ViewChild(TotalizadorAgenteComponent, { static: true }) totalizadorAgente!: TotalizadorAgenteComponent;

  @ViewChild(BalancoDiarioComponent, { static: true }) balancoDiario!: BalancoDiarioComponent;

  cortes!: CorteCadastradoDto[];

  dataAtualizacao!: Date;

  displayedColumns: string[] = [
      'Expansao',
      'select',
      'Fonte.Nome',
      'NomeUsinaConjuntoUsina',
      'Agente',
      'Conexao.Sigla',
      'PotenciaInstalada',
      'GeracaoAtual.Geracao',
      'Icones',
      'LimiteAtual',
      'Operacao',
      'MotivoRestricao',
      'StatusGerdin',
      'StatusSinapse',
      'AcaoSinapse',
      'Online',
      'HorarioStatus',
      'Acao',
  ];

  dataSource: MatTableDataSource<CorteCadastradoDto> = new MatTableDataSource<CorteCadastradoDto>([]);

  state = 'default';

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  selection = new SelectionModel<number>(true, []);

  private _refreshSubscription!: Subscription;

  private _obterDadosSubscription!: Subscription;

  private _pausedStack = 1;

  private _inLoadingIndividualSelection = new SelectionModel<number>(true, []);

  private _time = 5000;

  private _everyFiveSeconds: Observable<number> = timer(this._time, this._time);

  showSpinner: boolean = false;

  constructor(
    private readonly service: ExecucaoAcompanhamentoService,
    private readonly alert: AlertService,
    private readonly dialog: MatDialog
  ) { 
  }

  ngOnInit() {
    this.init(true);
    if (!localStorage.getItem('poolingStopped')) {
        this.iniciarAtualizacao();
    }
  }

  init(expandir: boolean) {
    this.service.obterCortesCadastrados().subscribe((res: BaseResult<CorteCadastradoDto[]>) => {
      this.cortes = [];
        if (res.content) {
          let dataGeracao = new Date();
          let dataGeracaoRecente = dataGeracao;

          res.content.forEach(item => {
            this.cortes.push(new CorteCadastradoDto(item));

            if (item.GeracaoAtual) {
              dataGeracao = new Date(item.GeracaoAtual.UltimaCaptura);
    
              if (dataGeracao > dataGeracaoRecente) {
                dataGeracaoRecente = dataGeracao;
              }
            }
          });

          this.dataAtualizacao = dataGeracaoRecente;
        }

        this.totalizadorAgente.init();
        if (expandir) {
            this.balancoDiario.expandir();
        }

        this.setDados(this.cortes);
    }, (error: any) => {
      this.alert.error(error, 'Falha ao obter cortes');
    });
  }

  private setDados(data: CorteCadastradoDto[]) {
    // this.dataAtualizacao = data.DataDaUltimaAtualizacao;

    this.popularDataSource(data);
  }

  popularDataSource(res: CorteCadastradoDto[]): void {
    this.dataSource.data = res.filter(item => !item.isCanceladoManual());
    this.dataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
            case 'Fonte.Nome':
                return item.Fonte.Nome;
              case 'Conexao.Sigla':
                return item.Conexao.Sigla;
            case 'GeracaoAtual.Geracao':
                return item.GeracaoAtual.Geracao;
            case 'StatusSinapse':
                return item.Criticidade;
            case 'AcaoSinapse':
                return item.Criticidade;
            case 'HorarioStatus':
                return item.HistoricoDeAlteracaoDeStatus[0] ? item.HistoricoDeAlteracaoDeStatus[0].Alteracao : null;
            default:
                return item[property];
        }
    };
    this.dataSource.sort = this.sort;
    this.atualizarEstadoSelecionados();
  }

  private atualizarEstadoSelecionados() {
    const selectedButIsNoLongerAvaliable =
        this.selection.selected.filter(
            id => !this.obterItensSelecionaveis()
                .some(x => id === this.itemId(x))
        );
    this.selection.deselect(...selectedButIsNoLongerAvaliable);
  }

  private itemId(item: CorteCadastradoDto) {
    return item ? item.IdComandoOperacao : 0;
  }

  obterItensSelecionaveis(): CorteCadastradoDto[] {
    return this.dataSource.data.filter(x => this.ehSelecionavel(x));
  }

  ehSelecionavel(item: CorteCadastradoDto) {
    return this.isEnviarSinapseMulti(item);
  }

  isEnviarSinapseMulti(item: CorteCadastradoDto): boolean  {
    return item.isEnviarSinapse();
  }

  private isIntegradoSINapse(item: CorteCadastradoDto): boolean {
    return item.IntegracaoSinapse !== undefined;
  }

  atualizar(value: boolean) {
    this.finalizado = value;

    if (this.finalizado) {
        this.finalizadoEntrada = this.finalizado;
    }
  }

  cancelarTodos() {
    this.pausarAtualizacao();
    const elements = this.filtrarItensParaCancelar();
    this.setInLoading(true, ...elements);

    if (!elements.length) {
        this.alert.warn(`Nenhum item se enquadra nas regras de cancelamento`);
        this.iniciarAtualizacao();
        return;
    }

    this.service.cancelarTodosOsCortes(...elements.map((x) => x.IdComandoOperacao))
        .pipe(
            switchMap(_value => this.atualizarDados(false)),
            finalize(() => {
                this.setInLoading(false, ...elements);
                this.iniciarAtualizacao();
            })
        )
        .subscribe(() => {
            this.totalizadorAgente.init();
            this.alert.success(`Foram cancelados ${elements.length} solicitações com sucesso!`, 'Cancelamento');
        }, (error: any) => {
            this.alert.error(error, 'Não foi possível realizar a ação!');
        });
  }

  filtrarItensParaCancelar(): CorteCadastradoDto[] {
    // Os itens que estejam sem status do SINapse e com os botões Confirmar e Cancelar apresentados na coluna Status Confirmação;
    return this.dataSource.data.filter((x) => x.isVisualizarCancelar());
  }

  pausarAtualizacao() {
    if (this._refreshSubscription) {
        this._refreshSubscription.unsubscribe();
    }
    if (this._obterDadosSubscription) {
        this._obterDadosSubscription.unsubscribe();
    }
    this._pausedStack++;
    // TODO: pensar em alguma forma de identificar comandos de pause sem um futuro comando de reinicializar
  }

  private isCanceladoSINapse(item: CorteCadastradoDto): boolean {
    return item.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.Cancelada
        && this.isIntegradoSINapse(item);
  }

  private setInLoading(loading: boolean, ...items: CorteCadastradoDto[]) {
    if (items) {
      if (loading) {
        this._inLoadingIndividualSelection.select(...items.map(x => this.itemId(x)));
      } else {
        this._inLoadingIndividualSelection.deselect(...items.map(x => this.itemId(x)));
      }
    }
  }

  inLoadingIndividual(item: CorteCadastradoDto): boolean {
    return this._inLoadingIndividualSelection.isSelected(this.itemId(item));
  }

  isAnyInLoadingIndividual(): boolean {
    return this._inLoadingIndividualSelection.hasValue();
  }

  iniciarAtualizacao() {
    // this._pausedStack--;
    // if (!this._refreshSubscription && this._pausedStack === 0) {
    //     this._refreshSubscription = this._everyFiveSeconds.subscribe(() => {
    //         this.atualizarDadosManual();
    //     });
    // }
    // if (this._pausedStack < 0) {
    //     console.error(`Por algum erro no codigo, o _pausedStack está ficando negativo: ${this._pausedStack}. Investigar causa`);
    // }
  }

  atualizarDadosManual() {
    this.atualizarDados()
        .then();
  }

  private atualizarDados(checarSePausado: boolean = true): Promise<boolean> {
    return new Promise((resolve, reject) => {
        this._obterDadosSubscription = this.service.obterCortesCadastrados()
            .pipe(finalize(() => resolve(true)))
            .subscribe({
                next: res => {
                    /* Isso não poderia ocorrer, teria que melhorar o controle de atualização para não alterar o
                    datasource em paralelo (que é a finalidade do pausar) */
                    // TODO: teria que refatorar todos as camadas do refresh para poder dar unsubscribe neles, no momento do pause
                    if (!checarSePausado || !this.estaPausado()) {
                        this.setDados(res.content);
                    }
                },
                error: reject
            });
    });
  }

  private estaPausado(): boolean {
    return this._pausedStack > 0;
  }

  habilitarCancelarTodos() {
    const execucaoModels = this.filtrarItensParaCancelar();
    return execucaoModels.length < 1;
  }

  isOptionEnviarSinapseMulti(): boolean  {
    return this.itensSelecionadosParaEnviarSinapse().length > 0 && !this.isAnyInLoadingIndividual();
  }

  itensSelecionadosParaEnviarSinapse(): CorteCadastradoDto[] {
    return this.itensSelecionados().filter(x => this.isEnviarSinapseMulti(x));
  }

  itensSelecionados() {
    return this.dataSource.data.filter(x => this.selection.selected.some(id => id === this.itemId(x)));
  }

  enviarSinapseSelecionados() {
    this.pausarAtualizacao();

    const elements = this.itensSelecionadosParaEnviarSinapse();

    if (!elements.length) {
        this.alert.warn('Nenhum item selecionado pode ser enviado para o SINapse');
        this.iniciarAtualizacao();
        return;
    }

    this.setInLoading(true, ...elements);

    this.service.enviarSinapseMulti(...elements.map(x => x.IdComandoOperacao))
      .pipe(
        finalize(() => {
          this.setInLoading(false, ...elements);
          this.iniciarAtualizacao();
        })
      )
      .subscribe((res: any) => {
        //
      }, (error: any) => {
        this.alert.error(error, 'Falha ao enviar selecionados');
      });

    this.setInLoading(false, ...elements);
  }

  private atualizarComandoOperacaoRetorno(item: CorteCadastradoDto, comandoOperacao: ComandoOperacaoModel) {
    if (!item) {
        throw new Error('Dados da tabela inconsistentes no tratamento do retorno sinapse');
    }
    if (!comandoOperacao) {
        throw new Error('Dados do comando operação do retorno inconsistentes.');
    }
    item.IdComandoOperacao = comandoOperacao.Id;
  }

  atualizarManual() {
    this.atualizarDadosSincronismo();
  }

  private atualizarDadosSincronismo() {
    this.showSpinner = true;
    this.service.atualizarGeracao(undefined, undefined,
      undefined, undefined, undefined,
      undefined, undefined, undefined,
      undefined, undefined, undefined,
      undefined, undefined).subscribe((res) => {

        this.service.atualizarFluxos(undefined, undefined,
          undefined, undefined, undefined,
          undefined, undefined, undefined,
          undefined, undefined, undefined,
          undefined, undefined).subscribe((res) => {
            this.showSpinner = false;
            this.init(false);
          }, (error: any) => {
            this.alert.error(error, 'Falha ao atualizar fluxos');
            this.showSpinner = false;
          });
      }, (error: any) => {
        this.alert.error(error, 'Falha ao atualizar gerações');
        this.showSpinner = false;
      });
  }

  obterCorTooltipEstado(item: CorteCadastradoDto) {
    if (!item.CondicaoOperacao) {
        return 'TEstadoPadrao';
    }
    switch (item.CondicaoOperacao.Id) {
        case EstadoDaUsinaEnum.RUIM:
            return 'TEstadoRuim';
        case EstadoDaUsinaEnum.ATENCAO:
            return 'TEstadoAtencao';
        default:
            return 'TEstadoPadrao';
    }
  }

  obterCorColunaEstado(item: CorteCadastradoDto) {
      if (!item.CondicaoOperacao) {
          return 'CEstadoPadrao';
      }
      switch (item.CondicaoOperacao.Id) {
          case EstadoDaUsinaEnum.RUIM:
              return 'CEstadoRuim';
          case EstadoDaUsinaEnum.ATENCAO:
              return 'CEstadoAtencao';
          default:
              return 'CEstadoPadrao';
      }
  }


  isConsulta(): boolean  {
    const perfilSelecionado = localStorage.getItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'));

    return perfilSelecionado !== ''
          && PerfilEnum.CONS === perfilSelecionado;
  }

  confirmar(item: CorteCadastradoDto) {
    this.pausarAtualizacao();
    this.setInLoading(true, item);

    // let registros = this.dataSource.data;
    // const registrosAux = registros;
    // registros = [];
    // let confirmado = null;

    this.service.confirmarCorte(item.IdComandoOperacao)
        .pipe(
            finalize(() => {
                this.setInLoading(false, item);
                this.iniciarAtualizacao();
            })
        )
        .subscribe(res => {
            // confirmado = res.content;

            // registrosAux.forEach(reg => {
            //     if (confirmado.IdUsiconjusi === reg.IdUsinaConjuntoUsina) {
            //         reg.ComandoOperacao.DataConfirmacao = confirmado.DataConfirmacao;
            //         reg.ComandoOperacao.Integracao = confirmado.Integracao;
            //         reg.ComandoOperacao.StatusSolicitacao = confirmado.IdStatusolicitacao;
            //         reg.ComandoOperacao.Observacao = confirmado.ObsComandOperacao;
            //     }

            //     registros.push(reg);
            // });

            // this.popularDataSource(registros);

            // Não temos dados dos totalizadores, se precisar tem que consultar
            // this.execucao = res.content;
            this.totalizadorAgente.init();
        }, (error: any) => {
            this.alert.error(error, 'Falha ao confirmar corte');
        });
}

cancelar(item: CorteCadastradoDto) {
    this.pausarAtualizacao();
    this.setInLoading(true, item);

    // let registros = this.dataSource.data;
    // const registrosAux = registros;
    // registros = [];
    // let cancelado = null;

    this.service.cancelarCorte(item.IdComandoOperacao)
        .pipe(
            finalize(() => {
                this.setInLoading(false, item);
                this.iniciarAtualizacao();
            })
        )
        .subscribe(res => {
            // cancelado = res.content;

            // registrosAux.forEach(reg => {
            //     if (cancelado.IdUsiconjusi === reg.IdUsinaConjuntoUsina) {
            //         reg.ComandoOperacao['DataFinalizacao'] = cancelado.DataFinalizacao;
            //         reg.ComandoOperacao.Integracao = cancelado.Integracao;
            //         reg.ComandoOperacao.StatusSolicitacao = cancelado.IdStatusolicitacao;
            //     } else {
            //         registros.push(reg);
            //     }
            // });

            // this.popularDataSource(registros);

            // Não temos dados dos totalizadores, se precisar tem que consultar
            // this.execucao = res.content;
            this.totalizadorAgente.init();
        }, (error: any) => {
            this.alert.error(error, 'Falha ao cancelar corte');
        });
  }

  enviarSinapse(item: CorteCadastradoDto) {
    this.pausarAtualizacao();
    this.setInLoading(true, item);

    this.service.enviarSinapse(item.IdComandoOperacao)
      .pipe(
        finalize(() => {
          this.setInLoading(false, item);
          this.iniciarAtualizacao();
        })
      )
      .subscribe(res => {
        this.atualizarComandoOperacaoRetorno(item, res.content);
      }, (error: any) => {
        // atualiza status para erro já que não recebe o item em caso de erro

        if (item.IntegracaoSinapse) {
          item.IntegracaoSinapse.IdStatusSolicitacao = StatusSinapseEnum.Erro;
        }

        this.alert.error(error, 'Não foi possível realizar a ação!');
      });
  }

  cancelarSinapse(item: CorteCadastradoDto) {
    this.pausarAtualizacao();
    this.setInLoading(true, item);

    this.service.cancelarSinapse(item.IdComandoOperacao)
      .pipe(
        finalize(() => {
          this.setInLoading(false, item);
          this.iniciarAtualizacao();
        })
      )
      .subscribe(res => {
        this.atualizarComandoOperacaoRetorno(item, res.content[0]);
      }, (error: any) => {
        this.alert.error(error, 'Não foi possível realizar a ação!');
      });
  }

  

  informarCiencia(item: CorteCadastradoDto) {
    this.pausarAtualizacao();
    this.setInLoading(true, item);

    let registros = this.dataSource.data;
    const registrosAux = registros;
    registros = [];
    let informadoCiencia: any = null;

    this.service.informarCiencia(item.IdComandoOperacao)
        .pipe(
            finalize(() => {
                this.setInLoading(false, item);
                this.iniciarAtualizacao();
            })
        )
        .subscribe((res: any) => {
            informadoCiencia = res.content;
            let warnings = res.warnings;
            registrosAux.forEach(reg => {
                if (informadoCiencia.Integracao.IdStatusSinapse !== StatusSinapseEnum.PendenteImpedida) {
                    if (informadoCiencia.Id === reg.IdComandoOperacao) {
                        reg = informadoCiencia;
                    }

                    registros.push(reg);
                }
            });

            this.popularDataSource(registros);

            if (warnings.length > 0) {
                warnings.forEach((alerta: any) => {
                    this.alert.warn(alerta.ErrorMessage);
                });
            }
        }, (error: any) => {
            // atualiza status para erro já que não recebe o item em caso de erro
            // element.ComandoOperacao.Integracao.IdStatusSinapse = StatusSinapseEnum.Erro;

            registrosAux.forEach(reg => {
                if (item.IdUsinaConjuntoUsina === reg.IdUsinaConjuntoUsina
                    && reg.IntegracaoSinapse) {
                    reg.IntegracaoSinapse.IdStatusSolicitacao = StatusSinapseEnum.Erro;
                }

                registros.push(reg);
            });

            this.popularDataSource(registros);

            this.alert.error(error, 'Não foi possível realizar a ação!');
        });
  }


  editarItem(item: CorteCadastradoDto): void {
    this.pausarAtualizacao();

    const dialogRef = this.dialog.open(EdicaoComandoOperacaoComponent, {
        data: {
            IdComandoOperacao: item.IdComandoOperacao,
        } as EdicaoComandoOperacaoParams,
        width: '90%',
        minWidth: '1400px',
        /**
         * Fechamento pelo usuario foi habilitado para evitar que o usuario saia do modal sem querer durante o salvamento
         * Se necessario, para contornar isso pode ser implementado:
         * https://github.com/angular/components/issues/14292#issuecomment-767597837
         */
        disableClose: true
    });

    dialogRef.afterClosed()
        .pipe(
            finalize(() => {
                this.iniciarAtualizacao();
            })
        )
        .subscribe((result: any) => {
            // if (result) {
            //     this.setDados(result.dados);
            //     if (isFilho) {
            //         this.setHistoricos(result.historicos, this.expandedElement);
            //     }
            // }
            this.totalizadorAgente.init();
        }, (error: any) => this.alert.error(error));
  }

  marcarTodas() {
    this.isTodasSelecionadas() ?
        this.selection.clear() :
        this.itensSelecionaveisDatasource().forEach(row => this.selection.select(this.itemId(row)));
  }

  isTodasSelecionadas() {
    const numSelected = this.selection.selected.length;
    const numRows = this.itensSelecionaveisDatasource().length;
    return numSelected === numRows;
  }

  itensSelecionaveisDatasource(): CorteCadastradoDto[] {
    return this.dataSource.data.filter(x => this.isSelecionavel(x));
  }

  isSelecionavel(item: CorteCadastradoDto): boolean {
    return this.isEnviarSinapseMulti(item);
  }

  obterDescricaoSelecao(row?: CorteCadastradoDto): string {
    if (!row) {
        return `Todos ${this.isTodasSelecionadas() ? 'deselecionados' : 'selecionados'}`;
    }
    return `${this.selection.isSelected(this.itemId(row)) ? 'deselecionado' : 'selecionado'}`;
  }

  isSelecionada(item: CorteCadastradoDto) {
    return this.selection.isSelected(this.itemId(item));
  }

  isAlgumaSelecionada() {
        return this.selection.hasValue();
  }

  marcarItem(item: CorteCadastradoDto) {
    this.selection.toggle(this.itemId(item));
  }

  abrirHistorico(event: MouseEvent, item: CorteCadastradoDto) {

    const dialogRef = this.dialog.open(HistoricoCorteComponent, {
      data: {
        element: item
      },
      width: '75%',
      minWidth: '1000px',
      /**
       * Fechamento pelo usuario foi habilitado para evitar que o usuario saia do modal sem querer durante o salvamento
       * Se necessario, para contornar isso pode ser implementado:
       * https://github.com/angular/components/issues/14292#issuecomment-767597837
       */
      disableClose: true
    });

    dialogRef.afterClosed()
      .pipe(
        finalize(() => {
          this.iniciarAtualizacao();
        })
      )
      .subscribe((result: any) => {
        this.iniciarAtualizacao();
        // if (result) {
        //     this.setDados(result.dados);
        //     if (isFilho) {
        //         this.setHistoricos(result.historicos, this.expandedElement);
        //     }
        // }
        // this.totalizadorAgente.init();
      });
  }

}
