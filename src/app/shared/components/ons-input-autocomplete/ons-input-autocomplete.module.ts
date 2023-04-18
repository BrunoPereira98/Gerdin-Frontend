import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material-module/material.module';
import { OnsInputAutocompleteComponent } from './ons-input-autocomplete.component';

@NgModule({
  declarations: [OnsInputAutocompleteComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [OnsInputAutocompleteComponent],
})
export class OnsInputAutocompleteModule {}
