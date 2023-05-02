import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  get urlApi(): string {
    return environment.production ? this.configService?.urlApi : environment.apiUrl;
  }

  get urlApiBdt(): string {
    return this.configService?.urlApiBdt;
  }

  get applicationName(): string {
    return this.configService?.applicationName;
  }

  get logTela() {
    return this.configService.logTela;
  }

  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {}

  handleResponse(response: any) {
    if (response.success && this.hasInformations(response))
      console.log(response.informations[0]);
    else if (this.hasErrors(response)) console.error(response.errors[0]);

    return response.data || {};
  }

  hasInformations(response: any): boolean {
    let messages = response.informations as Array<string>;
    return messages != null && messages.length > 0;
  }

  hasErrors(response: any): boolean {
    let messages = response.errors as Array<string>;
    return messages != null && messages.length > 0;
  }
}
