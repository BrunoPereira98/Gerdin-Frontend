import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnsSelectComponent } from './ons-select.component';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@NgModule({
  declarations: [OnsSelectComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [OnsSelectComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsSelectModule),
      multi: true,
    },
  ],
})
export class OnsSelectModule {}
