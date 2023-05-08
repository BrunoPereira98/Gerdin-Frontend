import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaInstalacoesService } from "./services/consulta-instalacoes.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { RetornoFiltro } from "../../shared/components/filtro/models/retorno-filtro";
import { ConsultaInstalacaoDto } from './models/consulta-instalacao-dto';

@Component({
  selector: 'app-consulta-instalacoes',
  templateUrl: './consulta-instalacoes.component.html',
  styleUrls: ['./consulta-instalacoes.component.scss']
})
export class ConsultaInstalacoesComponent implements OnInit {
  dataSource: MatTableDataSource<ConsultaInstalacaoDto> = new MatTableDataSource<ConsultaInstalacaoDto>([]);

  finalizado: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['Fonte', 'Nome', 'Agente',
    'Area', 'Sigla', 'Conexao', 'PotenciaInstalada', 'CondicaoOperacao'];

  constructor(
    private readonly consultaInstalacoesService: ConsultaInstalacoesService) {
  }

  ngOnInit(): void {
    this.obterInstalacoes();
  }

  isFinalizado() {
    return this.finalizado
      && 'N' !== sessionStorage.getItem('isPesquisou');
  }

  atualizar(value: boolean) {
    this.finalizado = value;
  }

  private obterInstalacoes() {
    this.consultaInstalacoesService.obterInstalacoes().subscribe((item) => {
      this.dataSource.data = item.content;
      this.dataSource.sort = this.sort;
    })
  }

  pesquisar(retornoFiltro: RetornoFiltro) {
    this.consultaInstalacoesService.obterInstalacoes(retornoFiltro.instalacaoFiltro, retornoFiltro.instalacaoExcecaoFiltro,
      retornoFiltro.areaFiltro, retornoFiltro.pontoConexaoFiltro, retornoFiltro.pontoConexaoExcecaoFiltro,
      retornoFiltro.condicaoOperacaoFiltro, retornoFiltro.tipoInstalacaoFiltro, retornoFiltro.agenteFiltro,
      retornoFiltro.motivoFiltro, retornoFiltro.geracaoMinimaFiltro, retornoFiltro.fluxoSACIFiltro,
      retornoFiltro.sensibilidadeFiltro, retornoFiltro.operadorMatematicoFiltro).subscribe((item) => {

        this.dataSource.data = item.content;
        this.dataSource.sort = this.sort;
      })
  }

}

