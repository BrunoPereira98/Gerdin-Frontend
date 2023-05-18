import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, take } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  public open(options: {
    icon: string;
    message: string;
    subMessage?: string;
    cancelText: string;
    confirmText: string;
    width?: string;
    height?: string;
  }) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: options.width,
      height: options.height,
      disableClose: true,
      data: {
        icon: options.icon,
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
