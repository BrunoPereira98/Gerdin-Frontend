import { Injectable } from '@angular/core';
import { Token } from '../models/token';
import { BaseService } from '../services/base.service';

@Injectable()
export class TokenStoreService {
  constructor(private baseService: BaseService) {}

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
}
