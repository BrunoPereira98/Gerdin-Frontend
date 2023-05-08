import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseResult } from "../../../shared/models/base-result";
import { FilterUtils } from "../../../shared/utils/filter-utils";
import { ConsultaInstalacaoDto } from "../models/consulta-instalacao-dto";
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaInstalacoesService {

  constructor(private readonly httpClient: HttpClient,
    private baseService: BaseService) {
  }

  public obterInstalacoes(instalacao?: any[], instalacaoExcecao?: any[], area?: any[], pontoConexao?: any[],
    pontoConexaoExceto?: any[], condicaoOperacao?: any[], tipoInstalacao?: any[], agente?: any[], motivo?: any[],
    geracaoMinima?: any, fluxos?: any[], sensibilidade?: any, operadorMatematico?: string,
    orderBy?: string): Observable<BaseResult<ConsultaInstalacaoDto[]>> {

    let filter = new FilterUtils()
    let params = filter.updateParametros(instalacao, instalacaoExcecao, area, pontoConexao, pontoConexaoExceto, condicaoOperacao, tipoInstalacao, agente, motivo, geracaoMinima, fluxos, sensibilidade, operadorMatematico, orderBy);
    return this.httpClient.get<BaseResult<ConsultaInstalacaoDto[]>>(this.baseService.urlApi + 'ConsultaInstalacao/ObterInstalacoes', { params: params });
  }
}
