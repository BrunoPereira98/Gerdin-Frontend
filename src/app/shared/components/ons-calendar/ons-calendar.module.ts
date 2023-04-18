import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnsCalendarComponent } from './ons-calendar.component';
import { MaterialModule } from '../../material-module/material.module';

@NgModule({
  declarations: [OnsCalendarComponent],
  imports: [CommonModule, MaterialModule],
  exports: [OnsCalendarComponent],
})
export class OnsCalendarModule {}
