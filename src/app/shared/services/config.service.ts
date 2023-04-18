import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { JsonConfig } from './../models/json-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config!: JsonConfig;

  get urlApi() {
    // console.log(this.config);
    return this.config?.urlAPI;
  }

  get urlApiBdt() {
    // console.log(this.config);
    return this.config?.urlApiBdt;
  }

  get applicationName() {
    return this.config?.applicationName;
  }

  constructor(private http: HttpClient) {}

  async load() {
    const data = await firstValueFrom(
      this.http.get<JsonConfig>('assets/config.json')
    );
    // console.log(data);
    this.config = data;
  }

  async loadInObject() {
    await this.http.get<JsonConfig>('assets/config.json').subscribe({
      next: (data) => {
        // console.log(data);
        this.config = data;
      },
      complete: () => console.log('Completed in ConfigService'),
    });
  }
}
