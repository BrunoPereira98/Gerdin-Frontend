import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import { BaseService } from 'src/app/shared/services/base.service';
import { CalculosRestricoesModel } from '../models/calculos-restricoes-model';
import { BaseResult } from 'src/app/shared/models/base-result';
import { CalculoRestricaoTotalizadoresModel } from '../models/calculo-restricao-totalizadores-model';

@Injectable({
    providedIn: 'root'
})
export class CalculoRestricaoService {
    constructor(
        private readonly http: HttpClient,
        private baseService: BaseService
      ) { }
    

    // public obterDados(): Observable<CalculosRestricoesModel> {
    //     return this.http.get<CalculosRestricoesModel>(this.apiUrl + '/ComandoOperacao/ConsultarDadosCalculoRestricao')
    //         .pipe(map(x => new CalculosRestricoesModel(x)));
    // }

    public updateParametros(instalacoes?: any[], instalacaoExcecao?: any[], area?: any[],
                            pontoConexao?: any[], pontoConexaoExceto?: any[], condicaoOperacao?: any[],
                            tipoInstalacao?: any[], agente?: any[], motivo?: any[], geracaoMinima?: any,
                            fluxos?: any[], sensibilidade?: any, operadorMatematico?: string, orderBy?: string) {
        let params = new HttpParams();
        if (instalacoes && instalacoes.length > 0) {
            for (const instalacao of instalacoes) {
                params = params.append('IdsUsinaConjuntoUsina', instalacao.Id);
            }
        }
        if (instalacaoExcecao && instalacaoExcecao.length > 0) {
            for (const instalacao of instalacaoExcecao) {
                params = params.append('IdsUsinaConjuntoUsinaExcecao', instalacao.Id);
            }
        }
        if (area && area.length > 0) {
            for (const are of area) {
                params = params.append('Area', are.Id);
            }
        }
        if (pontoConexao && pontoConexao.length > 0) {
            for (const pontos of pontoConexao) {
                params = params.append('PontoConexao', pontos.Id);
            }
        }
        if (pontoConexaoExceto && pontoConexaoExceto.length > 0) {
            for (const pontoConexao of pontoConexaoExceto) {
                params = params.append('PontoConexaoExcecao', pontoConexao.Id);
            }
        }
        if (condicaoOperacao && condicaoOperacao.length > 0) {
            for (const condOperacao of condicaoOperacao) {
                params = params.append('CondicaoOperacao', condOperacao.Id);
            }
        }
        if (tipoInstalacao && tipoInstalacao.length > 0) {
            for (const tipoInst of tipoInstalacao) {
                params = params.append('TipoInstalacao', tipoInst.Id);
            }
        }
        if (agente && agente.length > 0) {
            for (const agent of agente) {
                params = params.append('Agente', agent.Id);
            }
        }
        if (motivo && motivo.length > 0) {
            for (const motv of motivo) {
                params = params.append('IdsMotivo', motv.Id);
            }
        }
        if (geracaoMinima) {
            params = params.append('GeracaoAtual', geracaoMinima);
        }

        if (fluxos && fluxos.length > 0) {
            for (const fluxo of fluxos) {
                params = params.append('IdsTipoFluxo', fluxo.Id);
            }
        }

        if (sensibilidade !== ''
            && sensibilidade != null) {
            params = params.append('Valor', sensibilidade);
        }

        // if (operadorMatematico !== ''
        //     && operadorMatematico != null) {
        //     params = params.append('Operador', operadorMatematico);
        // }

        if (orderBy) {
            params = params.append('Sort', orderBy);
        }

        return params;
    }

    // public atualizarDadosSincronismo(instalacao: any[], instalacaoExcecao: string[], area: any[],
    //                                  pontoConexao: any[], pontoConexaoExceto: string[], condicaoOperacao: any[],
    //                                  tipoInstalacao: any[], agente: any[], motivo: any[], geracaoMinima: any,
    //                                  fluxos: string[], sensibilidade: any, operadorMatematico: string, orderBy): Observable<CalculosRestricoesModel> {

    //     let params = this.updateParametros(instalacao, instalacaoExcecao, area, pontoConexao,
    //         pontoConexaoExceto, condicaoOperacao, tipoInstalacao, agente, motivo, geracaoMinima, fluxos, sensibilidade,
    //         operadorMatematico, orderBy);

    //     return this.http.get<CalculosRestricoesModel>(this.apiUrl + '/ComandoOperacao/AtualizarDadosIntegracao', {params: params})
    //         .pipe(map(x => new CalculosRestricoesModel(x)));
    // }

    public obterDadosFiltrados(instalacao?: any[], instalacaoExcecao?: any[], area?: any[],
                               pontoConexao?: any[], pontoConexaoExceto?: any[], condicaoOperacao?: any[],
                               tipoInstalacao?: any[], agente?: any[], motivo?: any[], geracaoMinima?: any,
                               fluxos?: any[], sensibilidade?: any, operadorMatematico?: string, orderBy?: string): Observable<CalculosRestricoesModel> {
        let params = this.updateParametros(instalacao, instalacaoExcecao, area, pontoConexao,
            pontoConexaoExceto, condicaoOperacao, tipoInstalacao, agente, motivo, geracaoMinima, fluxos, sensibilidade,
            operadorMatematico, orderBy);
        return this.http.get<BaseResult<CalculoRestricaoTotalizadoresModel>>(`${this.baseService.urlApi}ComandoOperacao/ConsultarDadosCalculoRestricao`,
        {params: params});
        // return this.http.get<CalculosRestricoesModel>( + 'ComandoOperacao/ConsultarDadosCalculoRestricao', {params: params})
        //     .pipe(map(x => new CalculosRestricoesModel(x)));
    }

    // public calcularRestricao(valores: any): Observable<BaseResult<ValorCalculadoTotalizadoresModel>> {
    //     return this.http.post<BaseResult<ValorCalculadoTotalizadoresModel>>(
    //         this.apiUrl + '/ComandoOperacao/CalcularRestricoes', valores, this.httpOptions);
    // }

    // public incluirRestricao(valores: any): Observable<BaseResult<CalculoRestricaoInclusaoRetorno>> {
    //     return this.http.post<BaseResult<CalculoRestricaoInclusaoRetorno>>(this.apiUrl + '/ComandoOperacao/CalcularRestricoes/Inclusao',
    //         valores, this.httpOptions);
    // }

    // public consultarMotivoRestricao(): Observable<BaseResult<TipoMotivorestricao[]>> {
    //     return this.http.get<BaseResult<TipoMotivorestricao[]>>(this.apiUrl + '/TipoMotivorestricao/All');
    // }

    // public calcularRestricaoPerformance(valores: any): Observable<any> {
    //     return this.http.post<any>(this.apiUrl + '/ComandoOperacao/CalcularRestricoesPerformance', valores, this.httpOptions);
    // }
}
