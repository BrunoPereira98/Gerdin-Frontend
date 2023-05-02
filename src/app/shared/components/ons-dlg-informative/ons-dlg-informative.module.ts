import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material-module/material.module';
import { OnsDlgInformativeComponent } from './ons-dlg-informative.component';

@NgModule({
  declarations: [OnsDlgInformativeComponent],
  imports: [CommonModule, MaterialModule],
  exports: [OnsDlgInformativeComponent],
  entryComponents: [OnsDlgInformativeComponent],
})
export class OnsDlgInformativeModule {}
