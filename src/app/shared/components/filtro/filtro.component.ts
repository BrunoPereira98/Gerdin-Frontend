import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FiltroService } from './services/filtro.service';
import { RetornoFiltro } from './models/retorno-filtro';
import { OperadorMatematico } from './models/pperador-matematico';
import { OnsSelectModel } from '../../models/ons-select-model';
import { DateAdapter } from '@angular/material/core';
import { OnsInputAutocompleteChipListComponent } from '../ons-input-autocomplete-chip-list/ons-input-autocomplete-chip-list.component';
import { OnsSelectComponent } from '../ons-select/ons-select.component';
import { OnsInputNumberComponent } from '../ons-input-number/ons-input-number.component';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public valoresFiltros: any = [];

  @Input() tipoFiltro: string = '';

  retornoFiltro: RetornoFiltro = new RetornoFiltro();

  @Output() pesquisa = new EventEmitter<RetornoFiltro>();

  public operadoresMatematicos: OnsSelectModel[] = [];

  finalizado = false;
  finalizadoPesquisa = false;

  @ViewChildren(OnsInputAutocompleteChipListComponent) filtrosChipList: QueryList<OnsInputAutocompleteChipListComponent> | undefined;
  @ViewChildren(OnsSelectComponent) filtrosSelectList: QueryList<OnsSelectComponent> | undefined;
  @ViewChildren(OnsInputNumberComponent) filtrosInputNumberList: QueryList<OnsInputNumberComponent> | undefined;

  constructor(private readonly filtroService: FiltroService,
    private dateAdapter: DateAdapter<Date>,) {
    this.dateAdapter.setLocale('pt-br');
    this.finalizado = false;
    this.finalizadoPesquisa = true;
  }

  limpar() {
    this.filtrosChipList?.toArray().forEach(filtro => {
      filtro.limpar();
    });

    this.retornoFiltro.sensibilidadeFiltro = undefined;
    this.retornoFiltro.geracaoMinimaFiltro = undefined;
    this.retornoFiltro.operadorMatematicoFiltro = OperadorMatematico.MAOI.Id.toString();

    this.limparDatas();
  }

  ngOnInit(): void {
    sessionStorage.setItem('isPesquisou', 'N');

    this.limparDatas();

    this.obterFiltros();
  }

  limparDatas() {
    if (this.tipoFiltro === 'R') {
      const data = new Date();
      data.setHours(0, 0, 0, 0);
      this.retornoFiltro.dataInicialFiltro = data;
      const dataFinal = new Date();
      dataFinal.setHours(23, 59, 0, 0);
      this.retornoFiltro.dataFinalFiltro = dataFinal;
    }
  }

  obterFiltros() {
    this.filtroService.obterFiltros().subscribe(res => {
      this.valoresFiltros = res.content;

      this.operadoresMatematicos.push(new OnsSelectModel(OperadorMatematico.MAOI.Id.toString(), OperadorMatematico.MAOI.Description.toString()));
      this.operadoresMatematicos.push(new OnsSelectModel(OperadorMatematico.MEOI.Id.toString(), OperadorMatematico.MEOI.Description.toString()));

      this.inicializarFiltros();
    });
  }

  getOculta(valor: string) {
    if (!this.isVisible(valor)) {
      return 'ocultar';
    } else {
      return 'espacos';
    }
  }

  isVisible(valor: string) {
    return this.tipoFiltro === valor
      || 'T' == valor;
  }

  pesquisar(tipoPesquisa: string = 'S') {
    this.finalizadoPesquisa = true;
    
    if (this.tipoFiltro === 'R') {
      if (!this.retornoFiltro.dataInicialFiltro
        || !this.retornoFiltro.dataFinalFiltro) {
        alert('Devem ser preenchidas as datas!');
        return;
      }

      if (new Date(this.retornoFiltro.dataInicialFiltro) > new Date(this.retornoFiltro.dataFinalFiltro)) {
        alert('Data inicial deve ser menor ou igual a data final!');
        return;
      }
    }

    sessionStorage.setItem('isPesquisou', tipoPesquisa);
    this.pesquisa.emit(this.retornoFiltro);
  }

  onDataInicialChange() {
    const dataFinal = this.retornoFiltro.dataInicialFiltro;

    if (dataFinal) {
      // dataFinal.setHours(23);
      // dataFinal.setMinutes(59);
      // dataFinal.setSeconds(59);
      this.retornoFiltro.dataFinalFiltro = dataFinal;
    }
  }

  inicializarFiltros() {
    this.filtrosChipList?.toArray().forEach(filtro => {
      filtro.carregarSalvos();
    });

    this.filtrosSelectList?.toArray().forEach(filtro => {
      filtro.carregarSalvos();
    });

    this.filtrosInputNumberList?.toArray().forEach(filtro => {
      filtro.carregarSalvos();
    });

    this.pesquisar('I');
  }

  atualizar (value: boolean) {
    this.finalizado = value;
}

  atualizarPesquisa(value: boolean) {
      this.finalizadoPesquisa = value;
  }

  isFinalizado() {
    return this.finalizado;
  }

  isFinalizadoPesquisa() {
      return this.finalizadoPesquisa;
  }

}
