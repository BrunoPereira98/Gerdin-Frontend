import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { BaseResult } from 'src/app/shared/models/BaseResult';
import { BaseService } from 'src/app/shared/services/base.service';
import { FiltrosUsinaConjuntoUsinaDto } from '../dto/filtros-usina-conjunto-usina-dto';

@Injectable({
  providedIn: 'root',
})
export class FiltroService {
  constructor(
    private readonly http: HttpClient,
    private baseService: BaseService
  ) { }

  obterFiltros(): Observable<BaseResult<FiltrosUsinaConjuntoUsinaDto>> {
    return this.http.get<BaseResult<FiltrosUsinaConjuntoUsinaDto>>(`${this.baseService.urlApi}/UsinaConjuntoUsina/Filtros`).pipe(retry(3));
  }

}
