import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material-module/material.module';
import { OnsFiltroPesquisaComponent } from './ons-filtro-pesquisa.component';

@NgModule({
  declarations: [OnsFiltroPesquisaComponent],
  imports: [CommonModule, MaterialModule],
  exports: [OnsFiltroPesquisaComponent],
})
export class OnsFiltroPesquisaModule {}
