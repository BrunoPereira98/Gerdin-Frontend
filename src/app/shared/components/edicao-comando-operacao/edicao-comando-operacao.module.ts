import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { OnsInputNumberModule } from '../ons-input-number/ons-input-number.module';
import { OnsSelectModule } from '../ons-select/ons-select.module';
import { OnsCalendarModule } from '../ons-calendar/ons-calendar.module';
import { LoadingModule } from '../loading/loading.module';
import { EdicaoComandoOperacaoComponent } from './edicao-comando-operacao.component';
import { OnsTextareaModule } from '../ons-textarea/ons-textarea.module';
import { OnsDatetimeModule } from '../ons-datetime/ons-datetime.module';

@NgModule({
  declarations: [EdicaoComandoOperacaoComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule,
    OnsInputNumberModule,
    OnsSelectModule,
    OnsCalendarModule,
    OnsTextareaModule,
    OnsDatetimeModule,
    LoadingModule],
  exports: [EdicaoComandoOperacaoComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EdicaoComandoOperacaoModule),
      multi: true,
    },
  ],
})
export class EdicaoComandoOperacaoModule { }
