import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { UsuarioDto } from '../models/usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class SelecaoPerfilService {
  apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  public obterDados(): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(this.apiUrl + 'AngularSettings/Usuario');
  }
}
