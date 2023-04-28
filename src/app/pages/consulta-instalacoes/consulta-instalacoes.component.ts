import {Component, OnInit, ViewChild} from '@angular/core';
import {ConsultaInstalacoesService} from "./services/consulta-instalacoes.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

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
    'Area', 'Sigla','PontoConexao','PotenciaInstalada','NomeCondicaoOperacao'];

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

}

