import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelecaoPerfilComponent } from './selecao-perfil.component';
import { OnsSelectModule } from '../ons-select/ons-select.module';

@NgModule({
  declarations: [SelecaoPerfilComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, OnsSelectModule],
  exports: [SelecaoPerfilComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelecaoPerfilModule),
      multi: true,
    },
  ],
})
export class SelecaoPerfilModule {}
