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
          message: this.mesagemErro(error),
          subMessage: subMessage,
          type: 'Error ' + error.status + '!',
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

  private mesagemErro(error: HttpErrorResponse): string {
    let msg;
    if (error.status === 0) {
      msg = 'Servidor inativo!';
    } else if (error.status === 401 || error.status === 403) {
      msg = 'Você não tem permissão para executar esta ação';
    } else if (error.status === 404) {
      msg =
        'Erro ao processar serviço remoto. Tente novamente.\n' +
          error.error?.Messages?.join(', ') ?? error.message;
    } else if (error.status === 500) {
      msg = error.error?.Messages?.join(', ') ?? error.message;
    } else {
      msg = error.error?.Messages?.join(', ') ?? error.message;
    }
    return msg;
  }
}
