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
import { BaseResult, ValidationFailure } from 'src/app/shared/models/base-result';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CalculoRestricao } from './services/calculo-restricao';
import { CalculoRestricaoFluxo } from './services/calculo-restricao-fluxo';

@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
  styleUrls: ['./calculo.component.scss']
})
export class CalculoComponent implements OnInit {

  @Input() dataSource: MatTableDataSource<CalculoRestricaoDto> = new MatTableDataSource<CalculoRestricaoDto>([]);
  @Input() retornoFiltro!: RetornoFiltro;
  @Input() nmFluxo!: string;

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
    private readonly alert: AlertService,
    private router: Router,
    private calculoRestricaoService: CalculoRestricao,
    private calculoRestricaoFluxoService: CalculoRestricaoFluxo
  ) { 
  }

  ngOnInit() {
    this.consultarMotivoRestricao();
  }

  consultarMotivoRestricao() {
    this.service.consultarMotivoRestricao().subscribe((res: BaseResult<MotivoRestricaoDto[]>) => {
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
    this.setInLoading(true, ...this.dataSource.data);

    this.calculoRestricaoService.calcular(this.ValorDaRestricao, this.dataSource);

    this.setInLoading(false, ...this.dataSource.data);
  }

  disableCalcularFluxo() {
    return !(this.retornoFiltro
        && this.retornoFiltro.fluxoSACIFiltro?.length
        && 'S' === sessionStorage.getItem('isPesquisou'));
  }

  liberarGeracao() {
    this.setInLoading(true, ...this.dataSource.data);
    this.motivosSelecao = this.motivosSelecaoLiberacao;
    const motivo = this.motivos.find((item: MotivoRestricaoDto) => !item.Exibir);

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
    const motivo = this.motivos.find((item: MotivoRestricaoDto) => item.Id.toString() === this.Motivo);

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

    this.service.efetuarCortes(gravarEfetivarCorteDto).pipe(
      finalize(() => {
        this.setInLoading(false, ...registros);
      })
    ).subscribe((res: any) => {
      if (res.message
        && res.message.length > 0) {
        res.message.forEach((alerta: ValidationFailure) => {
          this.alert.warn(alerta.ErrorMessage);
        });
      } else {
        this.router.navigateByUrl('/execucao-acompanhamento');
      }
    }, (error: any) => {
      if (error) {
        error.error.messages.forEach((item: ValidationFailure) => this.alert.error(error, item.ErrorMessage));
      } else {
        this.alert.error(error, 'Falha ao efetuar cortes');
      }
    });
  }

  temMotivoPreenchido(): boolean {
    return this.Motivo !== undefined
            && this.Motivo !== '';
  }

  possuiAlgumValorDeGeracaoInvalido(): boolean {
      return this.dataSource.data.some(x => !x.possuiGeracao());
  }

  calcularRestricaoFluxo() {
    this.setInLoading(true, ...this.dataSource.data);

    this.calculoRestricaoFluxoService.calcular(this.ValorDaRestricao, this.dataSource, this.nmFluxo);

    this.setInLoading(false, ...this.dataSource.data);
  }

  private setInLoading(loading: boolean, ...items: CalculoRestricaoDto[]) {
    if (loading) {
        this._inLoadingIndividualSelection.select(...items.map(x => x && x.UsinaConjuntoUsina ? x.UsinaConjuntoUsina?.Id : 0));
    } else {
        this._inLoadingIndividualSelection.deselect(...items.map(x => x && x.UsinaConjuntoUsina ? x.UsinaConjuntoUsina?.Id : 0));
    }
  }

}
