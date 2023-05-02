import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnsCalendarComponent } from './ons-calendar.component';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@NgModule({
  declarations: [OnsCalendarComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [OnsCalendarComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsCalendarModule),
      multi: true,
    },
  ],
})
export class OnsCalendarModule {}
