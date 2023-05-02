import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material-module/material.module';
import { OnsDscRegraComponent } from './ons-dsc-regra.component';

@NgModule({
  declarations: [OnsDscRegraComponent],
  imports: [CommonModule, MaterialModule],
  exports: [OnsDscRegraComponent],
})
export class OnsDscRegraModule {}
