import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { VersaoDto } from '../models/versao-dto';

@Injectable({
  providedIn: 'root'
})
export class VersaoSistemaService {
  apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  public obterVersaoSistema(): Observable<VersaoDto>{
    return this.http.get<VersaoDto>(environment.apiUrl + 'AngularSettings/VersaoSistema');
  }

}
