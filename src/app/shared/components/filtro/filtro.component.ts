import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectItem } from '../../models/select-Item';
import { distinctUntilChanged, map, Observable, startWith, tap } from 'rxjs';
import { FiltroService } from './services/filtro.service';
import { FiltroDto } from './dto/filtro-dto';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public valoresFiltros: any = [];

  constructor(private readonly filtroService: FiltroService) {
    // this.finalizado = false;
    // this.finalizadoPesquisa = false;
  }

  ngOnInit(): void {
    sessionStorage.setItem('isPesquisou', 'N');

    // this.inicializarFiltros();

    // if (this.tipoFiltro === 'R') {
    //   const data = new Date();
    //   data.setHours(0, 0, 0, 0);
    //   this.dataInicialFiltro.setValue(data);
    //   const dataFinal = new Date();
    //   dataFinal.setHours(23, 59, 0, 0);
    //   this.dataFinalFiltro.setValue(dataFinal);
    // }

    this.obterFiltros();
  }

  obterFiltros() {
    this.filtroService.obterFiltros().subscribe(res => {
      this.valoresFiltros = res.content;

      // this.operadorMatematicoValue.push(OperadorMatematico.MAOI);
      // this.operadorMatematicoValue.push(OperadorMatematico.MEOI);

      // if (this.tipoFiltro === 'CR') {
      //   this.obterTodosTipos();
      //   this.consultarMotivoRestricao();
      // } else {
      //   this.pesquisar('I');
      // }
    });
  }

}
