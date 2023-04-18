import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AngularSettings } from '../models/angular-settings';
import { JsonConfig } from '../models/json-config';
import { BaseService } from './base.service';

@Injectable()
export class AngularSettingsService {
  apiUrl!: string;

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  getConfigsPop() {
    return this.httpClient.get<JsonConfig>('assets/config.json').pipe(
      switchMap((config) => {
        this.apiUrl = config.urlAPI;
        return this.httpClient.get<AngularSettings>(
          `${this.apiUrl}AngularSettings`
        );
      })
    );
  }
}
