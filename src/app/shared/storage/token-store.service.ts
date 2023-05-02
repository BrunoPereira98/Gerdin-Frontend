import { Injectable } from '@angular/core';
import { Token } from '../models/token';
import { BaseService } from '../services/base.service';

@Injectable()
export class TokenStoreService {
  private token!: string;
  private refreshToken!: string;
  private tokenExpiration!: Date | null;

  constructor(private baseService: BaseService) {}

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    this.tokenExpiration = this.getTokenExpiration(token);
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  getStore(): Token {
    const token = sessionStorage.getItem(
      `key_${this.baseService.applicationName}`
    );

    if (!token) {
      return {} as Token;
    }

    return JSON.parse(token);
  }

  addStore(token: string | null): void {
    sessionStorage.setItem(
      `key_${this.baseService.applicationName}`,
      JSON.stringify(token)
    );
  }

  deletoToken() {
    sessionStorage.removeItem(`key_${this.baseService.applicationName}`);
  }

  isTokenNotExists(): boolean {
    const notExistis = [undefined, null, ''].includes(this.token);
    console.log("Token Existente? ", notExistis);
    return notExistis;
  }

  isTokenExpired(): boolean {
    const expired =  this.tokenExpiration != null && this.tokenExpiration < new Date();
    console.log("Token Expitado? ", expired);
    return expired;
  }

  private getTokenExpiration(token: string): Date | null {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (decodedToken.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }
}
