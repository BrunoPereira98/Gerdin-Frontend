import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { PerfilEnum } from 'src/app/shared/components/enums/perfil-enum';
import { CalculoRestricaoDto } from '../../models/calculo-restricao-dto';
import { CalculoRestricaoService } from '../../services/calculo-restricao.service';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { RetornoFiltro } from 'src/app/shared/components/filtro/models/retorno-filtro';
import { OnsSelectModel } from 'src/app/shared/models/ons-select-model';
import { MotivoRestricaoDto } from 'src/app/shared/models/motivo-restricao-dto';
import { GravarEfetivarCorteDto } from '../calculo/models/gravar-efetivar-corte-dto';
import { GravarEfetivarCorteValoresDto } from '../calculo/models/gravar-efetivar-corte-valores-dto';
import { ValidationFailure } from 'src/app/shared/models/base-result';

@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
  styleUrls: ['./calculo.component.scss']
})
export class CalculoComponent implements OnInit {

  @Input() dataSource: MatTableDataSource<CalculoRestricaoDto> = new MatTableDataSource<CalculoRestricaoDto>([]);
  @Input() retornoFiltro!: RetornoFiltro;

  ValorDaRestricao!: number;

  Motivo!: string;

  motivosSelecao: OnsSelectModel[] = [];

  motivosSelecaoPadrao: OnsSelectModel[] = [];

  motivosSelecaoLiberacao: OnsSelectModel[] = [];

  Observacao!: string;

  motivos: MotivoRestricaoDto[] = [];
  
  public motivoCorte!: MotivoRestricaoDto;

  private _inLoadingIndividualSelection = new SelectionModel<number>(true, []);

  constructor(
    private readonly service: CalculoRestricaoService,
    private readonly alert: AlertService
  ) { 
  }

  ngOnInit() {
    this.consultarMotivoRestricao();
  }

  consultarMotivoRestricao() {
    this.service.consultarMotivoRestricao().subscribe((res: any) => {
        if (res.content) {
          this.motivos = res.content;
          res.content.forEach((motivo: MotivoRestricaoDto) => {
            this.motivosSelecaoLiberacao.push(new OnsSelectModel(motivo.Id.toString(), motivo.Descricao));

            if (motivo.Exibir) {
              this.motivosSelecaoPadrao.push(new OnsSelectModel(motivo.Id.toString(), motivo.Descricao));
            }
          });

          this.motivosSelecao = this.motivosSelecaoPadrao;
        }
    }, (error: any) => {
      this.alert.error(error, 'Falha ao obter motivos de restrição');
    });
}

  isAnyInLoadingIndividual(): boolean {
    return this._inLoadingIndividualSelection.hasValue();
  }


  calcularRestricao() {
    if (!this.ValorDaRestricao) {
        this.alert.warn('O campo restrição total deve ser preenchido!');
        return;
    }
    if (this.ValorDaRestricao === 0) {
        this.alert.warn('O campo restrição total deve ser maior que zero!');
        return;
    }

    const usinaValores: any[] = [];
    this.dataSource.data.map(d => {
        const input = {
            IdUsinaConjuntoUsina: d.UsinaConjuntoUsina?.Id,
            GeracaoAtual: d.UsinaConjuntoUsina?.GeracaoAtual.Geracao,
            LimiteAtual: d.ComandoOperacao ? d.ComandoOperacao.LimiteAtual : null,
            PotenciaInstalada: d.UsinaConjuntoUsina?.PotenciaInstalada
        };
        usinaValores.push(input);
    });

    const body = {
        UsinasValores: usinaValores,
        ValorDaRestricao: this.ValorDaRestricao
    };

    const registros = this.dataSource.data;

    this.setInLoading(true, ...registros);

    // this.service.calcularRestricao(body)
    //     .pipe(
    //         finalize(() => {
    //             this.setInLoading(false, ...registros);
    //         })
    //     )
    //     .subscribe(res => {
    //         if (res.warnings.length > 0) {
    //             res.warnings.forEach(alerta => {
    //                 this._toast.alert(alerta.ErrorMessage);
    //             });
    //         }
    //         registros
    //             .forEach(reg => {
    //                 const ret = res.content.Resultados.find(item => item.IdUsinaConjuntoUsina === reg.IdUsinaConjuntoUsina);
    //                 reg.NovoLimite = ret.NovoLimite;
    //                 reg.ValorCalculado = ret.ValorCalculado;
    //             });

    //         this.popularDataSource(registros);
    //     }, error => this.tratarErrosResult(error));
  }

  

  disableCalcularFluxo() {
    return !(this.retornoFiltro
        && this.retornoFiltro.fluxoSACIFiltro?.length
        && 'S' === sessionStorage.getItem('isPesquisou'));
  }

  liberarGeracao() {
    this.setInLoading(true, ...this.dataSource.data);
    this.motivosSelecao = this.motivosSelecaoLiberacao;
    const motivo = this.motivos.find((item: any) => !item.Exibir);

    if (motivo) {
      this.motivoCorte = motivo;
      this.Motivo = this.motivoCorte.Id.toString();

      this.selecionarFiltroCorte();

      this.dataSource.data.forEach(item => item.liberarGeracao());
      this.setInLoading(false, ...this.dataSource.data);
    }
  }

  limitarGeracao() {
      this.setInLoading(true, ...this.dataSource.data);
      this.dataSource.data.forEach(item => item.limitarGeracao());
      this.setInLoading(false, ...this.dataSource.data);
  }

  retirarGeracaoTotal() {
      this.setInLoading(true, ...this.dataSource.data);
      this.dataSource.data.forEach(item => item.retirarGeracao());
      this.setInLoading(false, ...this.dataSource.data);
  }

  selecionarFiltroCorte() {
    const motivo = this.motivos.find((item: any) => item.Id.toString() === this.Motivo);

    if (motivo?.Exibir) {
      this.motivosSelecao = this.motivosSelecaoPadrao;
    }

    if (motivo) {
      this.motivoCorte = motivo;
    }
  }

  isConsulta() {
    return localStorage.getItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'))
        && PerfilEnum.CONS === localStorage.getItem('perfilSelecionado' + localStorage.getItem('nomeUsuario'));
  }

  efetuarCorte() {
    if (!this.temMotivoPreenchido()) {
      this.alert.warn('O campo motivo restrição deve ser preenchido!');
      return;
    }
    if (this.possuiAlgumValorDeGeracaoInvalido()) {
      this.alert.warn('A geração das usinas não pode ser um valor negativo.');
      return;
    }

    const registros = this.dataSource.data.filter(x => x.NovoLimite !== null);

    const cortes: GravarEfetivarCorteValoresDto[] = [];

    this.dataSource.data.forEach((item: CalculoRestricaoDto) => {
      if (item.NovoLimite !== null) {
        cortes.push(
          new GravarEfetivarCorteValoresDto(
            item.UsinaConjuntoUsina ? item.UsinaConjuntoUsina.Id : 0,
            item.ValorCalculado,
            Number(item.NovoLimite),
            item.ComandoOperacao ? item.ComandoOperacao.LimiteAtual : item.UsinaConjuntoUsina ? item.UsinaConjuntoUsina.GeracaoAtual.Geracao : 0,
            item.UsinaConjuntoUsina ? item.UsinaConjuntoUsina?.PotenciaInstalada : 0,
            item.UsinaConjuntoUsina ? item.UsinaConjuntoUsina.GeracaoAtual?.Geracao : 0
          )
        )
      }
    });

    if (cortes.length <= 0) {
      this.alert.warn('Nenhuma usina possui valor de limite novo');
      return;
    }

    let gravarEfetivarCorteDto: GravarEfetivarCorteDto = new GravarEfetivarCorteDto();

    gravarEfetivarCorteDto.idMotivoRestricao = Number(this.Motivo);
    gravarEfetivarCorteDto.Observacao = this.Observacao;
    gravarEfetivarCorteDto.Cortes = cortes;

    this.setInLoading(true, ...registros);

    this.service.efetuarCortes(gravarEfetivarCorteDto).subscribe((res: any) => {
      if (res.message
        && res.message.length > 0) {
        res.message.forEach((alerta: ValidationFailure) => {
          this.alert.warn(alerta.ErrorMessage);
        });
      }
    }, (error: any) => {
      this.alert.error(error, 'Falha ao efetuar cortes');
    });
  }

  temMotivoPreenchido(): boolean {
    return this.Motivo !== undefined
            && this.Motivo !== '';
  }

  possuiAlgumValorDeGeracaoInvalido(): boolean {
      return this.dataSource.data.some(x => !x.possuiGeracao());
  }

  calcularFluxo() {
    // if (this.ValorDaRestricao.value === '') {
    //   this._toast.alert('O campo restrição total deve ser preenchido!');
    //   return;
    // }
    // if (this.ValorDaRestricao.value === 0) {
    //   this._toast.alert('O campo restrição total deve ser maior que zero!');
    //   return;
    // }

    // const usinaValores = this.dataSource.data.map(d => {
    //   return {
    //     IdUsinaConjuntoUsina: d.IdUsinaConjuntoUsina,
    //     GeracaoAtual: d.GeracaoInstalacao.GeracaoAtual,
    //     LimiteAtual: d.ComandoOperacao ? d.ComandoOperacao.LimiteAtual : void 0,
    //     PotenciaInstalada: d.PotenciaInstalada,
    //     FluxoValor: d.Fluxo ? d.Fluxo.Valor : void 0
    //   };
    // });

    // const body = {
    //   UsinasValores: usinaValores,
    //   ValorDaRestricao: this.ValorDaRestricao.value,
    //   Fluxo: this.filtro.fluxoSACIFiltro.map(x => x.value)/* Equivalente FirstOrDefault */.find(_ => true)
    // };

    // const registros = this.dataSource.data;

    // this.setInLoading(true, ...registros);

    // this.calculoFluxoService.calcular(body).pipe(
    //   finalize(() => {
    //     /**
    //      * Aqui é necessario limpar todos os itens do Loading, pois no calculo, pode não retornar todos os itens, 
    //      * então removendo pelos itens atuais pode restar alguns que não estão mais na tela em estado de loading
    //      */
    //     this.clearLoading();
    //   })
    // ).subscribe(res => {
    //   if (res.warnings.length > 0) {
    //     res.warnings.forEach(alerta => {
    //       this._toast.alert(alerta.ErrorMessage);
    //     });
    //   }
    //   for (const item of registros) {
    //     const retornado = res.content.Resultados.find(x => this.isEqualItemId(x, item));
    //     if (retornado) {
    //       item.NovoLimite = retornado.NovoLimite;
    //       item.ValorCalculado = retornado.ValorCalculado;
    //     } else {
    //       item.NovoLimite = void 0;
    //     }
    //   }
    //   const toDeleteItems = registros.filter(x => x.NovoLimite === void 0);
    //   for (const itemDelete of toDeleteItems) {
    //     const index = registros.findIndex(x => this.isEqualItemId(x, itemDelete));
    //     registros.splice(index, 1);
    //   }

    //   this.popularDataSource(registros);
    // }, error => this.tratarErrosResult(error));
  }

  private setInLoading(loading: boolean, ...items: CalculoRestricaoDto[]) {
    if (loading) {
        this._inLoadingIndividualSelection.select(...items.map(x => x && x.UsinaConjuntoUsina ? x.UsinaConjuntoUsina?.Id : 0));
    } else {
        this._inLoadingIndividualSelection.deselect(...items.map(x => x && x.UsinaConjuntoUsina ? x.UsinaConjuntoUsina?.Id : 0));
    }
  }

}
