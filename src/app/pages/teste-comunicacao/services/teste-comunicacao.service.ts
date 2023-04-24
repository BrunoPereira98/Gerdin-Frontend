import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TesteComunicacao } from '../models/teste-comunicacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TesteComunicacaoService {
  apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  get() {
    return this.httpClient.get<TesteComunicacao>(`${this.apiUrl}Teste/ping`);
  }
}
