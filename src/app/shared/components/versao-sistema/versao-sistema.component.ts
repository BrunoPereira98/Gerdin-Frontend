import { Component, OnInit } from '@angular/core';
import { VersaoDto } from './models/versao-dto';
import { VersaoSistemaService } from './services/versao-sistema.service';

@Component({
  selector: 'app-versao-sistema',
  templateUrl: './versao-sistema.component.html',
  styleUrls: ['./versao-sistema.component.scss']
})
export class VersaoSistemaComponent implements OnInit {

  versao: VersaoDto = new VersaoDto();

  constructor(private versaoSistemaService: VersaoSistemaService) {
  }

  ngOnInit(): void {
    
  }

  inicializar() {
    this.versaoSistemaService.obterVersaoSistema().subscribe((item) => {
      this.versao = item;
    });
  }

}
