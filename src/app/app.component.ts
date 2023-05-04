import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "./shared/services/authentication.service";
import { AngularSettingsStoreService } from "./shared/storage/angular-settings-store.service";
import { angularSettingApi } from './shared/store/angular-setting.action';
import { angularSettingSelector } from './shared/store/angular-setting.selector';
import { StatusBarComponent } from './shared/components/status-bar/status-bar.component';
import { TokenStoreService } from './shared/storage/token-store.service';

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
    private readonly authenticationService: AuthenticationService,
    private readonly tokenStoreService: TokenStoreService
  ) {}

  angularSetting$ = this.store.select(angularSettingSelector);

  async ngOnInit() {
    this.store.dispatch(angularSettingApi());
    this.angularSetting$.subscribe({
      next: async (result) => {
        // this.angularSettingsStoreService.addStore(result);
        // this.authenticationService.requestToken();

        // if (this.authenticationService.havePermission()) {
        //   this.statuBar?.inicializar();
        // }

        if (result.federationUrl != '' && result.popLoginUrl != '') {
          this.angularSettingsStoreService.addStore(result);
          const token = await this.authenticationService.requestToken();

          if (this.tokenStoreService.getToken()) {
            this.tokenStoreService.deletoToken();
          }
          this.tokenStoreService.addStore(token);
          if (this.authenticationService.havePermission()) {
            this.statuBar?.inicializar();
          }
        }
      },
      error: (err) => console.log(err),
      complete: () => console.log("complete"),
    });
  }

  settingsResult() {}

  verificarAutenticacao() {
    this.authenticationService.estaLogado().subscribe((logado) => {
      // VERIFICA SE O LOGIN JÁ FOI REALIZADO E INFORMA HOME
    });
  }

}
