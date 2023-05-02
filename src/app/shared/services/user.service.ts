import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry, switchMap } from 'rxjs';
import { IJsonConfig } from '../models/json-config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl!: string;
  private _usuarioLogado!: User;
  private _logTela!: boolean;

  constructor(private readonly httpClient: HttpClient) {}

  getUserAuthenticated() {
    return this.httpClient.get<IJsonConfig>('assets/config.json').pipe(
      switchMap((config) => {
        this.apiUrl = config.urlAPI;
        this._logTela = config.logTela;
        return this.httpClient
          .get<User>(`${this.apiUrl}Usuarios/autenticado`)
          .pipe(
            retry(3),
            map((user: User) => {
              this._usuarioLogado = user;
              return user;
            })
          );
      })
    );
  }

  get usuarioLogado() {
    return this._usuarioLogado;
  }

  get logTela() {
    return this._logTela;
  }

  temPermissao(operacao: string) {
    return this._usuarioLogado?.operacoes?.includes(operacao);
  }
}
