import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "./shared/services/authentication.service";
import { AngularSettingsStoreService } from "./shared/storage/angular-settings-store.service";
import { angularSettingApi } from './shared/store/angular-setting.action';
import { angularSettingSelector } from './shared/store/angular-setting.selector';
import { StatusBarComponent } from './shared/components/status-bar/status-bar.component';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "gerdin-frontend";

  @ViewChild(StatusBarComponent, {static: true}) statuBar: StatusBarComponent | undefined;

  constructor(
    private readonly store: Store,
    private readonly angularSettingsStoreService: AngularSettingsStoreService,
    private readonly authenticationService: AuthenticationService
  ) {}

  angularSetting$ = this.store.select(angularSettingSelector);

  ngOnInit(): void {
    this.store.dispatch(angularSettingApi());
    this.angularSetting$.subscribe({
      next: (result) => {
        this.angularSettingsStoreService.addStore(result);
        this.authenticationService.requestToken();

        if (this.authenticationService.havePermission()) {
          this.statuBar?.inicializar();
        }
      },
      error: (err) => console.log(err),
      complete: () => console.log("complete"),
    });
  }
}
