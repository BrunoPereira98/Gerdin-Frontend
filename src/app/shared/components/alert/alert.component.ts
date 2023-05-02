import { Component, Inject, OnInit } from '@angular/core';
import {
  MatLegacySnackBarRef as MatSnackBarRef,
  MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA,
} from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  progress = 100;
  private currentIntervalId!: any;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<AlertComponent>
  ) {
    this.snackBarRef.afterOpened().subscribe(
      () => {
        const duration =
          this.snackBarRef.containerInstance.snackBarConfig.duration;
        this.runProgressBar(duration);
      },
      (error) => console.error(error)
    );
  }

  ngOnInit() {}

  dismissWithAction() {
    this.cleanProgressBarInterval();
    this.snackBarRef.dismissWithAction();
  }

  /**
   * @param duration - in milliseconds
   */
  runProgressBar(duration: number = 0) {
    this.progress = 100;
    const step = 0.005;
    this.cleanProgressBarInterval();
    this.currentIntervalId = setInterval(() => {
      this.progress -= 100 * step;
      if (this.progress < 0) {
        this.cleanProgressBarInterval();
      }
    }, duration * step);
  }

  cleanProgressBarInterval() {
    clearInterval(this.currentIntervalId);
  }
}
