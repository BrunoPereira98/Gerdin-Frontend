import {Component, OnInit} from '@angular/core';
import {ConsultaInstalacoesService} from "./services/consulta-instalacoes.service";
import {InstalacaoModel} from "./models/InstalacaoModel";

@Component({
  selector: 'app-consulta-instalacoes',
  templateUrl: './consulta-instalacoes.component.html',
  styleUrls: ['./consulta-instalacoes.component.scss']
})
export class ConsultaInstalacoesComponent implements OnInit {


  instalacaoModelList: InstalacaoModel[] = [];

  constructor(
    private readonly consultaInstalacoesService: ConsultaInstalacoesService) {
  }

  ngOnInit(): void {
    this.getInstalacoes()
  }

  private getInstalacoes() {
    this.consultaInstalacoesService.getInstalacoes().subscribe((item) => {
      console.log(item.content);
      this.instalacaoModelList = item.content;
    })
  }
}
