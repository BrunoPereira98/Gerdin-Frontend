import { Injectable } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { map, Observable, take } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  public open(options: {
    img: string;
    message: string;
    subMessage?: string;
    cancelText: string;
    confirmText: string;
  }) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '463px',
      height: '400px',
      disableClose: true,
      data: {
        img: options.img,
        message: options.message,
        subMessage: options.subMessage,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
      },
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }
}
