import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FiltroComponent } from './filtro.component';
import { OnsInputAutocompleteChipListModule } from '../ons-input-autocomplete-chip-list/ons-input-autocomplete-chip-list.module';
import { OnsInputNumberModule } from '../ons-input-number/ons-input-number.module';
import { OnsSelectModule } from '../ons-select/ons-select.module';
import { OnsCalendarModule } from '../ons-calendar/ons-calendar.module';
import { LoadingModule } from '../loading/loading.module';
import { OnsDatetimeModule } from '../ons-datetime/ons-datetime.module';

@NgModule({
  declarations: [FiltroComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, OnsInputAutocompleteChipListModule,
    OnsInputNumberModule,
    OnsSelectModule,
    OnsCalendarModule,
    OnsDatetimeModule,
    LoadingModule],
  exports: [FiltroComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FiltroModule),
      multi: true,
    },
  ],
})
export class FiltroModule { }
