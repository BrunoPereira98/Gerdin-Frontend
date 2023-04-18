import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnsInputNumberComponent } from './ons-input-number.component';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NumberDirective } from '../../directive/number.directive';
import { IsNumberOnlyDirective } from './directive/is-number-only.directive';

@NgModule({
  declarations: [OnsInputNumberComponent, IsNumberOnlyDirective],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [OnsInputNumberComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsInputNumberModule),
      multi: true,
    },
  ],
})
export class OnsInputNumberModule {}
