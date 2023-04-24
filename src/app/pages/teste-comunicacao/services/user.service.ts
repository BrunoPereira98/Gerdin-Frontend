import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry, switchMap } from 'rxjs';
import { User } from '../models/user';
import { JsonConfig } from './../../../shared/models/json-config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl!: string;
  _usuarioLogado!: User;

  constructor(private readonly httpClient: HttpClient) {}

  getUserAuthenticated() {
    return this.httpClient.get<JsonConfig>('assets/config.json').pipe(
      switchMap((config) => {
        // PEGA A APIURL DIRETO DO CONFIG.JSON
        this.apiUrl = config.urlAPI;
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
}
