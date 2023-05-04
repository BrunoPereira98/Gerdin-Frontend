import { Component, OnInit, ViewChild } from '@angular/core';
import { SelecaoPerfilComponent } from '../selecao-perfil/selecao-perfil.component';
import { VersaoSistemaComponent } from '../versao-sistema/versao-sistema.component';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  @ViewChild(SelecaoPerfilComponent, {static: true}) selecaoPerfil: SelecaoPerfilComponent | undefined;
  @ViewChild(VersaoSistemaComponent, {static: true}) versaoSistema: VersaoSistemaComponent | undefined;

  ngOnInit(): void {
    
  }

  inicializar() {
    this.selecaoPerfil?.inicializar();
    this.versaoSistema?.inicializar();
  }
  
}
