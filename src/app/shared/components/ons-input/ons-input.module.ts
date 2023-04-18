import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnsInputComponent } from './ons-input.component';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@NgModule({
  declarations: [OnsInputComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [OnsInputComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsInputModule),
      multi: true,
    },
  ],
})
export class OnsInputModule {}
