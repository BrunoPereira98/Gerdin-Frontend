import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatLegacySnackBar as MatSnackBar,
  MatLegacySnackBarDismiss as MatSnackBarDismiss,
  MatLegacySnackBarHorizontalPosition as MatSnackBarHorizontalPosition,
  MatLegacySnackBarVerticalPosition as MatSnackBarVerticalPosition,
} from '@angular/material/legacy-snack-bar';
import { AlertComponent } from '../alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private duration: number = 5000;

  constructor(private snackBar: MatSnackBar) {}

  error(error: HttpErrorResponse, subMessage?: string) {
    this.snackBar
      .openFromComponent(AlertComponent, {
        data: {
          message: error.error?.Messages?.join(', ') ?? error.message,
          subMessage: subMessage,
          type: 'Error '+ error.status + '!',
        },
        duration: this.duration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: 'alert-danger',
      })
      .afterDismissed()
      .subscribe({
        next: (matSnackBarDismiss: MatSnackBarDismiss) => {},
        error: (error) => {
          console.error(error);
        },
        complete: () => console.log('Complete'),
      });
  }

  success(mensagem: string, subMessage?: string) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: {
        message: mensagem,
        subMessage: subMessage,
        type: 'Sucesso!',
      },
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'alert-success',
    });
  }

  warn(mensagem: string, subMessage?: string) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: {
        message: mensagem,
        subMessage: subMessage,
        type: 'Alerta!',
      },
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'alert-warn',
    });
  }

  info(mensagem: string, subMessage?: string) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: {
        message: mensagem,
        subMessage: subMessage,
        type: 'Notificação',
      },
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'alert-info',
    });
  }
}
