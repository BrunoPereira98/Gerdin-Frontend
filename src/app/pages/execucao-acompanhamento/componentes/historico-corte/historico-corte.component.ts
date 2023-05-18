import { Component, Inject } from '@angular/core';
import { ExecucaoAcompanhamentoService } from '../../services/execucao-acompanhamento.service';
import { CorteCadastradoDto } from '../../models/corte-cadastrado-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PerfilEnum } from 'src/app/shared/components/enums/perfil-enum';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';

@Component({
  selector: 'app-historico-corte',
  templateUrl: './historico-corte.component.html',
  styleUrls: ['./historico-corte.component.scss']
})
export class HistoricoCorteComponent {
  formHistoricoCorte!: FormGroup;

  historicos!: CorteCadastradoDto[];

  isLoading: Boolean = true;

  displayedColumns: string[] = [
    'PotenciaInstalada',
    'GeracaoAtual.Geracao',
    'LimiteAtual',
    'Operacao',
    'MotivoRestricao',
    'StatusGerdin',
    'StatusSinapse',
    'HorarioStatus',
    'Acao',
  ];

  private _inLoadingIndividualSelection = new SelectionModel<number>(true, []);

  finalizado = false;

  constructor(private service: ExecucaoAcompanhamentoService,
    private dialogRef: MatDialogRef<HistoricoCorteComponent>,
    public fb: FormBuilder,
    private readonly alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dataParams: any) {
  }

  ngOnInit() {
    this.formHistoricoCorte = this.fb.group({
    });
    this.obterHistoricos(this.dataParams.element);
  }

  obterHistoricos(item: CorteCadastradoDto) {
    this.limparHistorico();
    this.service.obterHistoricosDeCortesCadastrados(item.IdComandoOperacao).subscribe(res => {

      this.historicos = [];
      if (res.content) {
        res.content.forEach(item => {
          this.historicos.push(new CorteCadastradoDto(item));
        });
      }
    }, (error: any) => {
      this.alert.error(error, 'Falha ao obter históricos');
    });
  }

  limparHistorico() {
    this.historicos = [];
  }

  fechar() {
    this.dialogRef.close();
  }
  
  isConsulta() {
    return localStorage.getItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'))
      && PerfilEnum.CONS === localStorage.getItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'));
  }

  inLoadingIndividual(item: CorteCadastradoDto): boolean {
    return this._inLoadingIndividualSelection.isSelected(this.itemId(item));
  }

  private itemId(item: CorteCadastradoDto) {
    return item ? item.IdComandoOperacao : 0;
  }

  isFinalizado() {
    return this.finalizado;
  }

  atualizar (value: boolean) {
    this.finalizado = value;
  }

  editarItem(item: CorteCadastradoDto, isFilho: boolean = false): void {
    // this.pausarAtualizacao();

    // const dialogRef = this._dialog.open(EdicaoComandoOperacaoModalComponent, {
    //   data: {
    //     isFilho: isFilho,
    //     itemPai: undefined,
    //     idAcaoOperacao: item.IdAcaoOperacao,
    //     idComandoOperacao: item.ComandoOperacao.Id,
    //     idUsinaConjuntoUsina: item.IdUsinaConjuntoUsina,
    //     potencia: item.PotenciaInstalada,
    //     dataSolicitacao: item.ComandoOperacao.DataSolicitacao,

    //     usina: item.NomeInstalacao,
    //     agente: item.Agente,
    //     pontoPartida: item.ComandoOperacao.PontoPartida,
    //     limiteAtual: item.ComandoOperacao.LimiteAtual,
    //     idMotivo: void 0,
    //     nomeMotivo: item.Motivo,
    //     dataConfirmacao: item.ComandoOperacao.DataConfirmacao,
    //     observacao: item.ComandoOperacao.Observacao,
    //     potenciaInstalada: item.PotenciaInstalada,
    //   } as EdicaoComandoOperacaoParams,
    //   width: '75%',
    //   minWidth: '1000px',
    //   /**
    //    * Fechamento pelo usuario foi habilitado para evitar que o usuario saia do modal sem querer durante o salvamento
    //    * Se necessario, para contornar isso pode ser implementado:
    //    * https://github.com/angular/components/issues/14292#issuecomment-767597837
    //    */
    //   disableClose: true
    // });

    // dialogRef.afterClosed()
    //   .pipe(
    //     finalize(() => {
    //       // this.iniciarAtualizacao();
    //     })
    //   )
    //   .subscribe((result: any) => {
    //     // if (result) {
    //     //   this.setDados(result.dados);
    //     //   if (isFilho) {
    //     //     this.setHistoricos(result.historicos, this.expandedElement);
    //     //   }
    //     // }
    //     // this.totalizadorAgente.init();
    //   }, this._toast.error);
  }
}