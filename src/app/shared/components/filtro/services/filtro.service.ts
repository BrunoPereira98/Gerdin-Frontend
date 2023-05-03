import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { BaseResult } from 'src/app/shared/models/base-result';
import { BaseService } from 'src/app/shared/services/base.service';
import { FiltrosUsinaConjuntoUsinaDto } from '../dto/filtros-usina-conjunto-usina-dto';
import { TipoMotivorestricao } from '../models/tipo-motivorestricao';
import { Fluxo } from 'src/app/shared/models/fluxo';

@Injectable({
  providedIn: 'root',
})
export class FiltroService {
  constructor(
    private readonly http: HttpClient,
    private baseService: BaseService
  ) { }

  obterFiltros(): Observable<BaseResult<FiltrosUsinaConjuntoUsinaDto>> {
    return this.http.get<BaseResult<FiltrosUsinaConjuntoUsinaDto>>(`${this.baseService.urlApi}UsinaConjuntoUsina/Filtros`);
  }

  public obterFluxoSACI(): Observable<BaseResult<Fluxo[]>> {
    return this.http.get<BaseResult<Fluxo[]>>(`${this.baseService.urlApi}FluxoSaci/ObterTodosTipos`);
  }

  public obterMotivoRestricao(): Observable<BaseResult<TipoMotivorestricao[]>> {
    return this.http.get<BaseResult<TipoMotivorestricao[]>>(`${this.baseService.urlApi}TipoMotivorestricao/All`);
  }

}
