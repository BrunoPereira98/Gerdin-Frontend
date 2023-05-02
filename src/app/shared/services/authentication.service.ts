import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { TokenStoreService } from '../storage/token-store.service';
import { angularSettingSelector } from '../store/angular-setting.selector';
import { BaseService } from './base.service';
import { UserTesteComunicacao } from '../models/user-teste-comunicacao';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationService {
  private popLoginUrl = '';
  private federationUrl = '';

  constructor(
    private httpService: HttpClient,
    private readonly store: Store,
    private readonly tokenStoreService: TokenStoreService,
    private baseService: BaseService
  ) {
    this.store.select(angularSettingSelector).subscribe({
      next: (res) => {
        this.federationUrl = res.federationUrl;
        this.popLoginUrl = res.popLoginUrl;
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  requestToken() {
    const applicationName = this.baseService.applicationName ? this.baseService.applicationName : environment.applicationName;
    const h = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    if (
      !environment.production &&
      ![undefined, null, ''].includes(this.federationUrl)
    ) {
      const urlObj = new URL(this.federationUrl);
      urlObj.protocol = 'http';
      this.federationUrl = urlObj.toString();
    }

    if (this.federationUrl === '') {
      this.federationUrl = environment.federationUrl;
    }

    return this.httpService
      .post<any>(
        this.federationUrl,
        'grant_type=password&client_id=' + applicationName,
        {
          headers: h,
          withCredentials: true,
        }
      )
      .subscribe({
        next: (res) => {
          this.tokenStoreService.addStore(res);
          this.havePermission();
        },
        error: (err) => console.log(err),
        complete: () => console.log('complete'),
      });
  }

  redirectToAuthPage() {
    const popLoginUrl = `${this.popLoginUrl}?ReturnUrl=${encodeURIComponent(
      window.location.href
    )}`;
    // window.stop();
    if (window.top) {
      window.top.location.href = popLoginUrl;
    }
  }

  havePermission(): UserTesteComunicacao | undefined {
    const helper = new JwtHelperService();
    const accessToken = this.tokenStoreService.getStore().access_token;

    if (!accessToken) {
      return undefined;
    }

    const decodedToken = helper.decodeToken(accessToken);

    const user: UserTesteComunicacao = {
      escopoOperacoes:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2015/07/identity/claims/operation'
        ] ?? [],
      escopos:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2015/07/identity/claims/scoperole'
        ] ?? [],
      login:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ] ?? [],
      nome: decodedToken['given_name'] ?? null,
      operacoes: decodedToken[''],
      perfil:
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] ?? [],
      perfis: decodedToken[''],
      sid:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'
        ] ?? [],
    };

    return user;
  }
}
