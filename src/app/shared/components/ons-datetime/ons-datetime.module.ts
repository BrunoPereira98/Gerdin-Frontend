import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnsDatetimeComponent } from './ons-datetime.component';
import { MaterialModule } from '../../material-module/material.module';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@NgModule({
  declarations: [OnsDatetimeComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [OnsDatetimeComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsDatetimeModule),
      multi: true,
    },
  ],
})
export class OnsDatetimeModule {}
