import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module/material.module';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { OnsInputAutocompleteChipListComponent } from './ons-input-autocomplete-chip-list.component';


@NgModule({
  declarations: [OnsInputAutocompleteChipListComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [OnsInputAutocompleteChipListComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnsInputAutocompleteChipListModule),
      multi: true,
    },
  ],
})
export class OnsInputAutocompleteChipListModule {}

