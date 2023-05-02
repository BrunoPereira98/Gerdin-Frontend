import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {InstalacaoModel} from "../models/InstalacaoModel";
import {BaseResult} from "../../../shared/models/base-result";
import {RetornoFiltro} from "../../../shared/components/filtro/models/retorno-filtro";

@Injectable({
  providedIn: 'root'
})
export class ConsultaInstalacoesService {
  apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  public getInstalacoes(filter?: RetornoFiltro): Observable<BaseResult<InstalacaoModel[]>> {

    let params = new HttpParams();
    if (filter) {
      // params = params.append('IdsUsinaConjuntoUsina', filter.IdsUsinaConjuntoUsina);
    }
    return this.httpClient.get<BaseResult<InstalacaoModel[]>>(this.apiUrl + 'UsinaConjuntoUsina/ConsultarInstalacoes', {params: params});
  }
}
