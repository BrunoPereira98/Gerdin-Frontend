import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnsTextareaComponent } from './ons-textarea.component';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@NgModule({
  declarations: [OnsTextareaComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [OnsTextareaComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsTextareaModule),
      multi: true,
    },
  ],
})
export class OnsTextareaModule {}
