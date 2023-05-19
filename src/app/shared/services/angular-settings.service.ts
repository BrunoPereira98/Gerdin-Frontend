import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, switchMap } from 'rxjs';
import { AngularSettings } from '../models/angular-settings';
import { IJsonConfig } from '../models/json-config';
import { environment } from 'src/environments/environment';

@Injectable()
export class AngularSettingsService {
  apiUrl!: string;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
    this.obterApiUrl();
  }

  async obterApiUrl() {
    let config = await firstValueFrom(this.httpClient.get<IJsonConfig>('assets/config.json'));
    this.apiUrl = config.urlAPI;
  }

  getApiUrl(){
    return this.apiUrl;
}

  getConfigsPop() {
    this.obterApiUrl();
    return this.httpClient.get<IJsonConfig>('assets/config.json').pipe(
      switchMap((config) => {
        this.apiUrl = config.urlAPI;
        return this.httpClient.get<AngularSettings>(
          `${environment.apiUrl}AngularSettings/Get`
        );
      })
    );
  }
}