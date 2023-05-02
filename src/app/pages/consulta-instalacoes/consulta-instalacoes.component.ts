import {Component, OnInit, ViewChild} from '@angular/core';
import {ConsultaInstalacoesService} from "./services/consulta-instalacoes.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {RetornoFiltro} from "../../shared/components/filtro/models/retorno-filtro";

@Component({
  selector: 'app-consulta-instalacoes',
  templateUrl: './consulta-instalacoes.component.html',
  styleUrls: ['./consulta-instalacoes.component.scss']
})
export class ConsultaInstalacoesComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  loading: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string [] = ['TipoInstalacao.Nome', 'NomeInstalacao', 'Agente',
    'Area', 'Sigla', 'PontoConexao', 'PotenciaInstalada', 'NomeCondicaoOperacao'];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private readonly consultaInstalacoesService: ConsultaInstalacoesService) {
  }

  ngOnInit(): void {
    this.getInstalacoes();
  }

  private getInstalacoes() {
    this.consultaInstalacoesService.getInstalacoes().subscribe((item) => {
      this.dataSource.data = item.content;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }

  pesquisar(event: RetornoFiltro) {
    this.consultaInstalacoesService.getInstalacoes(event).subscribe((item) => {
      this.dataSource.data = item.content;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }

  onSortChange(event: Sort) {
    switch (event.active) {
      case "TipoInstalacao.Nome":
        return this.ordernaFonte(event);
      case"NomeInstalacao":
        return this.ordernaNomeInstalacao(event);
      case "Agente":
        return this.ordernaAgente(event);
      case "Area":
        return this.ordernaArea(event);
      case "Sigla":
        return this.ordernaSigla(event);
      case "PontoConexao":
        return this.ordernaPontoConexao(event);
      case "PotenciaInstalada":
        return this.ordernaPotenciaInstalada(event);
      case "NomeCondicaoOperacao":
        return this.ordernaNomeCondicaoOperacao(event);
    }
  }

  private ordernaFonte(event: Sort) {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const lastNameA = a.TipoInstalacao.Nome;
      const lastNameB = b.TipoInstalacao.Nome;

      if (event.direction === 'asc') {
        return lastNameA < lastNameB ? -1 : 1;
      } else {
        return lastNameA > lastNameB ? -1 : 1;
      }
    });
  }

  private ordernaNomeInstalacao(event: Sort) {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const lastNameA = a.NomeInstalacao;
      const lastNameB = b.NomeInstalacao;

      if (event.direction === 'asc') {
        return lastNameA < lastNameB ? -1 : 1;
      } else {
        return lastNameA > lastNameB ? -1 : 1;
      }
    });
  }

  private ordernaAgente(event: Sort) {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const lastNameA = a.Agente;
      const lastNameB = b.Agente;

      if (event.direction === 'asc') {
        return lastNameA < lastNameB ? -1 : 1;
      } else {
        return lastNameA > lastNameB ? -1 : 1;
      }
    });
  }

  private ordernaArea(event: Sort) {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const lastNameA = a.Area;
      const lastNameB = b.Area;

      if (event.direction === 'asc') {
        return lastNameA < lastNameB ? -1 : 1;
      } else {
        return lastNameA > lastNameB ? -1 : 1;
      }
    });
  }

  private ordernaSigla(event: Sort) {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const lastNameA = a.SiglaConexao;
      const lastNameB = b.SiglaConexao;

      if (event.direction === 'asc') {
        return lastNameA < lastNameB ? -1 : 1;
      } else {
        return lastNameA > lastNameB ? -1 : 1;
      }
    });

  }

  private ordernaPontoConexao(event: Sort) {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const lastNameA = a.PontoConexao;
      const lastNameB = b.PontoConexao;

      if (event.direction === 'asc') {
        return lastNameA < lastNameB ? -1 : 1;
      } else {
        return lastNameA > lastNameB ? -1 : 1;
      }
    });
  }

  private ordernaPotenciaInstalada(event: Sort) {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const lastNameA = a.PotenciaInstalada;
      const lastNameB = b.PotenciaInstalada;

      if (event.direction === 'asc') {
        return lastNameA < lastNameB ? -1 : 1;
      } else {
        return lastNameA > lastNameB ? -1 : 1;
      }
    });
  }

  private ordernaNomeCondicaoOperacao(event: Sort) {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const lastNameA = a.NomeCondicaoOperacao;
      const lastNameB = b.NomeCondicaoOperacao;

      if (event.direction === 'asc') {
        return lastNameA < lastNameB ? -1 : 1;
      } else {
        return lastNameA > lastNameB ? -1 : 1;
      }
    });
  }

}

