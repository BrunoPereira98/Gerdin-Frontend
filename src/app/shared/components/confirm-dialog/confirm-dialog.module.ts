import { MatIconModule } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { ConfirmDialogService } from "./service/confirm-dialog.service";
import { MaterialModule } from "../../material-module/material.module";

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [ConfirmDialogService],
})
export class ConfirmDialogModule {}
