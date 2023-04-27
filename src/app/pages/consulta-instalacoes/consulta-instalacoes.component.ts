import {Component, OnInit} from '@angular/core';
import {ConsultaInstalacoesService} from "../../shared/services/service-pages/consulta-instalacoes.service";

@Component({
  selector: 'app-consulta-instalacoes',
  templateUrl: './consulta-instalacoes.component.html',
  styleUrls: ['./consulta-instalacoes.component.scss']
})
export class ConsultaInstalacoesComponent implements OnInit {

  constructor(
    private readonly consultaInstalacoesService: ConsultaInstalacoesService) {

  }

  ngOnInit(): void {
    this.getInstalacoes()
  }

  private getInstalacoes() {
    this.consultaInstalacoesService.getInstalacoes().subscribe((item) => {
      console.log(item);
    })
  }
}
