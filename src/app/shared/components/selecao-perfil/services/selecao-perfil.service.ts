import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { UsuarioDto } from '../models/usuario-dto';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SelecaoPerfilService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient,
    private baseService: BaseService) { }

  public obterPerfisSelecao(): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(this.baseService.urlApi + 'AngularSettings/Perfis/PerfisSelecao');
  }
}
