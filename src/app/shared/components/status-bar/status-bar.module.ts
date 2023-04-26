import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { StatusBarComponent } from './status-bar.component';
import { SelecaoPerfilModule } from '../selecao-perfil/selecao-perfil.module';
import { VersaoSistemaModule } from '../versao-sistema/versao-sistema.module';

@NgModule({
  declarations: [StatusBarComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SelecaoPerfilModule, VersaoSistemaModule],
  exports: [StatusBarComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusBarModule),
      multi: true,
    },
  ],
})
export class StatusBarModule {}
