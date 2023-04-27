import {Component, OnInit, ViewChild} from '@angular/core';
import {ConsultaInstalacoesService} from "./services/consulta-instalacoes.service";
import {InstalacaoModel} from "./models/InstalacaoModel";
import {MatTableDataSource} from "@angular/material/table";
import {formatDate} from "@angular/common";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-consulta-instalacoes',
  templateUrl: './consulta-instalacoes.component.html',
  styleUrls: ['./consulta-instalacoes.component.scss']
})
export class ConsultaInstalacoesComponent implements OnInit {
  linhas: MatTableDataSource<any> = new MatTableDataSource();
  colunas: Array<any> = [
    {nome: 'TipoInstalacao.Nome', descricao: 'Fonte', cHeader: 'coluna'},
    {nome: 'NomeInstalacao', descricao: 'Conjunto/Usina', cHeader: 'coluna'},
    {nome: 'Agente', descricao: 'Agente', cHeader: 'coluna'},
    {nome: 'Area', descricao: 'Área', cHeader: 'coluna'},
    {nome: 'SiglaConexao', descricao: 'Sigla', cHeader: 'coluna', cLinha: 'coluna-esquerda'},
    {nome: 'PontoConexao', descricao: 'Conexão', cHeader: 'coluna'},
    {
      nome: 'PotenciaInstalada',
      descricao: 'Potência',
      cHeader: 'colunaCentro',
      cLinha: 'coluna-centro',
      numMask: '1.0-0'
    },
    {nome: 'NomeCondicaoOperacao', descricao: 'Condição', cHeader: 'coluna'}
  ];
  loading: boolean = true;
  displayedColumns: any;

  @ViewChild(MatSort, {static: true})
  sort: MatSort = new MatSort;


  constructor(
    private readonly consultaInstalacoesService: ConsultaInstalacoesService) {
  }

  ngOnInit(): void {
    this.getInstalacoes()
  }

  private getInstalacoes() {
    this.consultaInstalacoesService.getInstalacoes().subscribe((item) => {
      this.linhas.data = item.content;
      this.displayedColumns = this.colunas.map(x => x.nome);
      this.addOrdenacaoColuns();

      this.linhas.sort = this.sort;

      this.loading = false;
    })
  }

  private addOrdenacaoColuns() {
    this.linhas.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'TipoInstalacao.Nome':
          return item.TipoInstalacao.Nome;
        case 'GeracaoInstalacao.GeracaoAtual':
          return item.GeracaoInstalacao ? item.GeracaoInstalacao.GeracaoAtual : null;
        case 'ComandoOperacao.LimiteAtual':
          return item.ComandoOperacao ? item.ComandoOperacao.LimiteAtual : null;
        case 'Motivo':
          return item.ComandoOperacao ? item.ComandoOperacao.Motivo : null;
        case 'Fluxo.Valor':
          return item.Fluxo ? item.Fluxo.Valor : null;
        default:
          return item[property];
      }
    };
  }

  obterValorColuna(item: any, nome: any) {
    if (!nome) {
      return '';
    }

    const campos: any[] = nome.split('.');

    if (campos.length > 1) {
      if (!item[campos[0]]
        || item[campos[0]] === undefined) {
        return '';
      }

      return item[campos[0]][campos[1]];
    } else {
      return item[campos[0]];
    }

  }

  formatarData(data: Date, formato: string = 'dd/MM/yyyy HH:mm') {
    if (data) {
      try {
        return formatDate(data, formato, 'pt-BR');
      } catch (error) {
        return '';
      }
    }
    return '';
  }

}
