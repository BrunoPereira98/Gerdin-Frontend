import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material-module/material.module';
import { OnsDataComponent } from './ons-data.component';

@NgModule({
  declarations: [OnsDataComponent],
  imports: [CommonModule, MaterialModule],
  exports: [OnsDataComponent],
})
export class OnsDataModule {}
