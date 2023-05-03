import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IJsonConfig } from './../models/json-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config!: IJsonConfig;

  get urlApi() {
    console.log(this.config);
    return this.config?.urlAPI;
  }

  get urlApiBdt() {
    console.log(this.config);
    return this.config?.urlApiBdt;
  }

  get applicationName() {
    return this.config?.applicationName;
  }

  get logTela() {
    return this.config.logTela;
  }

  constructor(private http: HttpClient) {}

  async load() {
    const data = await firstValueFrom(
      this.http.get<IJsonConfig>('assets/config.json')
    );
    console.log(data);
    this.config = data;
  }

  async loadInObject() {
    await this.http.get<IJsonConfig>('assets/config.json').subscribe({
      next: (data) => {
        console.log(data);
        this.config = data;
      },
      complete: () => console.log('Completed in ConfigService'),
    });
  }
}
