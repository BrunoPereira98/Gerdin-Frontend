import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-ons-dlg-informative',
  templateUrl: './ons-dlg-informative.component.html',
  styleUrls: ['./ons-dlg-informative.component.scss'],
})
export class OnsDlgInformativeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      confirmText: string;
      message: string;
      subMessage?: string;
      icon: string;
    },
    private mdDialogRef: MatDialogRef<OnsDlgInformativeComponent>
  ) {}

  public cancel() {
    this.close(false);
  }
  public close(value: boolean) {
    this.mdDialogRef.close(value);
  }
  public confirm() {
    this.close(true);
    console
  }
}
