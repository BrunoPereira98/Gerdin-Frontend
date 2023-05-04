import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { VersaoDto } from '../models/versao-dto';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class VersaoSistemaService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient,
    private baseService: BaseService) { }

  public obterVersaoSistema(): Observable<VersaoDto>{
    return this.http.get<VersaoDto>(this.baseService.urlApi + 'AngularSettings/VersaoSistema/VersaoSistema');
  }

}
