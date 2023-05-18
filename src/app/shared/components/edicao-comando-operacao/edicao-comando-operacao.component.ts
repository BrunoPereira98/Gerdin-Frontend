import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../alert/service/alert.service';
import { EdicaoComandoOperacaoParams } from './models/edicao-comando-operacao-params';
import { EdicaoComandoOperacaoService } from './services/edicao-comando-operacao.service';
import { BaseResult } from '../../models/base-result';
import { MotivoRestricaoDto } from '../../models/motivo-restricao-dto';
import { OnsSelectModel } from '../../models/ons-select-model';
import { AtualizarDadosCorteCommand } from './models/atualizar-dados-corte-command';
import { EdicaoComandoOperacaoForm } from './models/edicao-comando-operacao-form';
import { DatePipe } from '@angular/common';
import { DateValidators } from '../../validators/date-validator';
import { ConfirmDialogService } from '../confirm-dialog/service/confirm-dialog.service';

@Component({
  selector: 'app-edicao-comando-operacao',
  templateUrl: './edicao-comando-operacao.component.html',
  styleUrls: ['./edicao-comando-operacao.component.scss']
})
export class EdicaoComandoOperacaoComponent implements OnInit {

  finalizado = false;

  finalizadoSalvar = false;

  formEdicaComandoOperacao!: FormGroup;

  idMotivoSemRestricao: number = 4;

  motivoOptions: MotivoRestricaoDto[] = [];

  motivosSelecao: OnsSelectModel[] = [];

  constructor(
    private service: EdicaoComandoOperacaoService,
    private dialogRef: MatDialogRef<EdicaoComandoOperacaoComponent>,
    public fb: FormBuilder,
    private readonly alert: AlertService,
    private datePipe: DatePipe,
    private readonly confirmDialog: ConfirmDialogService,
    @Inject(MAT_DIALOG_DATA) public dataParams: EdicaoComandoOperacaoParams
  ) {
  }

  ngOnInit() {
    this.initFormGroup();
  }

  private initFormGroup() {
    this.formEdicaComandoOperacao = this.fb.group({
      PotenciaInstalada: [{value: '', disabled: true}, []],
      PontoPartida: ['', [Validators.required, Validators.maxLength(5), Validators.min(0), Validators.max(this.dataParams.PotenciaInstalada)]],
      LimiteAtual: ['', [Validators.required, Validators.maxLength(5)]],
      Operacao: [{value: '', disabled: true}, []],
      IdMotivo: ['', [Validators.required]],
      DataConfirmacao: ['', [Validators.required]],
      Observacao: ['', [Validators.maxLength(250)]],
    });

    this.consultarMotivoRestricao();
    
    if (this.dataParams) {
      this.formEdicaComandoOperacao.patchValue(this.dataParams);

      this.formEdicaComandoOperacao.patchValue({
        IdMotivo: this.dataParams.IdMotivo.toString(),
        DataConfirmacao: new Date(this.dataParams.DataConfirmacao),
      });
    }

    this.setupValitations([], []);
  }

  private setupValitations(historicos: any[], seguintes: any[]) {
    var convertDateToCompareIgnoreSeconds = (date: Date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
    const dataConfirmacaoValidators = [Validators.required];
    /**
     * Regra validada com o Rodrigo e é bem simples:
     * Se tiver anterior, o minimo é a data do anterior, senão não tem minimo
     * Se tiver seguinte, o maximo é a data do seguinte, senão não tem maximo
     */
    if (historicos && historicos.length) {
        const datasHistoricos = historicos
            // se não tiver confirmado, usar data de solicitação para não alterar ordem cronologica
            .map(x => x.ComandoOperacao.DataConfirmacao ? x.ComandoOperacao.DataConfirmacao : x.ComandoOperacao.DataSolicitacao)
            .map(date => new Date(date));
        const greaterThan = new Date(
            Math.max(
                ...datasHistoricos.map(date => date.getTime())
            )
        );
        dataConfirmacaoValidators.push(DateValidators.greaterThan(greaterThan, convertDateToCompareIgnoreSeconds));
    }
    if (seguintes && seguintes.length) {
        const datasSeguintes = seguintes
            .map(x => x.DataConfirmacao ? x.DataConfirmacao : x.DataSolicitacao)
            .map(date => new Date(date));
        const lessThan = new Date(
            Math.min(
                ...datasSeguintes.map(date => date.getTime())
            )
        );
        dataConfirmacaoValidators.push(DateValidators.lessThan(lessThan, convertDateToCompareIgnoreSeconds));
    }

    // SE utilizar o min e max do componente da calendar ele adiciona uma validação e também bloqueia o ranger de seleção, mas isso acaba gerando efeitos colaterias não desejaveis, então deixei somente a validação normal
    // TODO: UPDATE12+: https://stackoverflow.com/a/49076116/2290538: use addValidators
    this.formEdicaComandoOperacao.controls['DataConfirmacao'].setValidators(dataConfirmacaoValidators);
    this.formEdicaComandoOperacao.controls['DataConfirmacao'].updateValueAndValidity();
  }

  private consultarMotivoRestricao() {
    this.service.consultarMotivoRestricao().subscribe((res: BaseResult<MotivoRestricaoDto[]>) => {
      if (res.content) {
        this.motivosSelecao = [];

        res.content.forEach((item) => {
          if (item.Exibir
              || (this.dataParams.IdMotivo
                  && this.dataParams.IdMotivo === this.idMotivoSemRestricao) ) {
            this.motivosSelecao.push(new OnsSelectModel(item.Id.toString(), item.Descricao));
          }
        });
      }
    }, (error: any) => {
      this.alert.error(error, 'Falha ao obter motivos de restrição');
    });
  }

  atualizar (value: boolean) {
    this.finalizado = value;
  }

  atualizarSalvar(value: boolean) {
    this.finalizadoSalvar = value;
  }

  isFinalizado() {
    return this.finalizado;
  }

  isFinalizadoSalvar() {
    return this.finalizadoSalvar;
  }

  fechar() {
    if (this.formEdicaComandoOperacao.dirty) {
      const options = {
        icon: 'warn',
        message: `Dados alterados`,
        subMessage: `Há alterações não salvas que serão perdidas. Deseja realmente fechar o modal?`,
        cancelText: 'Não',
        confirmText: 'Sim',
        height: '347px',
        width: '500px'
      };
  
      this.confirmDialog.open(options);

      this.confirmDialog.confirmed().subscribe({
        next: (confirmed) => {
          if (confirmed) {
            this.dialogRef.close();
          }
        },
        error: (err: any) => this.alert.error(err),
        complete: () => console.log('Complete dialog remove Bloco'),
      });
    } else {
      this.dialogRef.close();
    }
    
  }

  get valorCorte() {
    const valor = this.formValue.PontoPartida - this.formValue.LimiteAtual;
    let campo = this.formEdicaComandoOperacao.get('Operacao');

    if (campo) {
      campo.setValue(valor);
    }
    return valor;
  }

  get f() {
      return this.formEdicaComandoOperacao.controls;
  }

  get formValue() {
      return this.formEdicaComandoOperacao.value as EdicaoComandoOperacaoForm;
  }

  fc(name: string) {
    return this.formEdicaComandoOperacao.get(name) as FormControl;
  }

  onSave() {
    if (this.formEdicaComandoOperacao.valid) {
      let atualizacao = new AtualizarDadosCorteCommand();
      const dataForm = this.formValue;
  
      atualizacao.IdComandoOperacao = this.dataParams.IdComandoOperacao;
      atualizacao.NovoLimite = dataForm.LimiteAtual;
      const dataConfirmacao =(dataForm.DataConfirmacao !==  null && dataForm.DataConfirmacao !==  undefined ? this.datePipe.transform(dataForm.DataConfirmacao, 'dd/MM/yyyy HH:mm') : '');
      atualizacao.DataConfirmacao = dataConfirmacao ? dataConfirmacao : '';
      atualizacao.IdTipoMotivoRestricao = dataForm.IdMotivo;
      atualizacao.GeracaoAtual = dataForm.PontoPartida;
      atualizacao.Observacao = dataForm.Observacao,
      atualizacao.PontoPartida = dataForm.PontoPartida;

      this.service.atualizarDadosDeCorte(atualizacao)
        .subscribe(res => {
          if (res !== null) {
            this.alert.success(`O registro foi alterado com sucesso!`, 'Comando Operação');

            this.dialogRef.close();
          }
        }, (error: any) => {
          this.alert.error(
            error
              ? error.error.errors[0].ErrorMessage
              : 'Verifique seus dados, não foi possível salvar a alteração',
            'Erro ao salvar');
        });
    }    
  }

  isSalvar() {
    return this.formEdicaComandoOperacao.valid && this.formEdicaComandoOperacao.dirty;
  }

  isCampoNaoInformado(campo: AbstractControl) {
    return this.formEdicaComandoOperacao.dirty
            && campo
            && campo.errors?.['required'];
  }

  isCampoExcedenteMaximoCaracter(campo: AbstractControl) {
    return this.formEdicaComandoOperacao.dirty
            && campo
            && campo.errors?.['maxlength'];
  }

  isCampoExedenteLimiteMin(campo: AbstractControl) {
    return this.formEdicaComandoOperacao.dirty
            && campo
            && campo.errors?.['min'];
  }

  isCampoExedenteLimiteMax(campo: AbstractControl) {
    return this.formEdicaComandoOperacao.dirty
            && campo
            && campo.errors?.['max'];
  }

  obterMaximoCaracterCampo(campo: AbstractControl) {
    return campo.errors?.['maxlength']['requiredLength'];
  }

  obterCaracterAtualCampo(campo: AbstractControl) {
    return campo.errors?.['maxlength']['actualLength'];
  }

  obterLimiteMinCampo(campo: AbstractControl) {
    return campo.errors?.['min']['min'];
  }

  obterLimiteMinAtualCampo(campo: AbstractControl) {
    return campo.errors?.['min']['actual'];
  }

  isCampoExedenteMaiorQue(campo: AbstractControl) {
    return this.formEdicaComandoOperacao.dirty
            && campo
            && campo.errors?.['greaterThan'];
  }

  obterValorCampoMaiorQue(campo: AbstractControl) {
    return campo.errors?.['greaterThan']['greaterThan'];
  }

  obterValorAtualCampoMaiorQue(campo: AbstractControl) {
    return campo.errors?.['greaterThan']['actual'];
  }

  isCampoExedenteMenorQue(campo: AbstractControl) {
    return this.formEdicaComandoOperacao.dirty
            && campo
            && campo.errors?.['lessThan'];
  }

  obterValorCampoMenorQue(campo: AbstractControl) {
    return campo.errors?.['lessThan']['lessThan'];
  }

  obterValorAtualCampoMenorQue(campo: AbstractControl) {
    return campo.errors?.['lessThan']['actual'];
  }

}
