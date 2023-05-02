import { MatIconModule } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material-module/material.module";
import { AlertComponent } from './alert.component';
import { AlertService } from './service/alert.service';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, MaterialModule],
  exports: [AlertComponent],
  entryComponents: [AlertComponent],
  providers: [AlertService],
})
export class AlertModule {}
