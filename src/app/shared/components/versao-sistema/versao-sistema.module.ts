import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { VersaoSistemaComponent } from './versao-sistema.component';

@NgModule({
  declarations: [VersaoSistemaComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [VersaoSistemaComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VersaoSistemaModule),
      multi: true,
    },
  ],
})
export class VersaoSistemaModule {}
