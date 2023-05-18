import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from 'src/app/shared/services/base.service';
import { BaseResult } from 'src/app/shared/models/base-result';
import { TotalizadorPorAgenteDto } from '../models/totalizador-por-agente-dto';
import { CorteCadastradoDto } from '../models/corte-cadastrado-dto';

@Injectable({
    providedIn: 'root'
})
export class ExecucaoAcompanhamentoService {
    

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    
    constructor(
        private readonly http: HttpClient,
        private baseService: BaseService
    ) { }

    public updateParametros(instalacoes?: any[], instalacaoExcecao?: any[], area?: any[],
        pontoConexao?: any[], pontoConexaoExceto?: any[], condicaoOperacao?: any[],
        tipoInstalacao?: any[], agente?: any[], motivo?: any[], geracaoMinima?: any,
        fluxos?: any[], sensibilidade?: any, operadorMatematico?: string, orderBy?: string) {
        let params = new HttpParams();
        if (instalacoes && instalacoes.length > 0) {
            for (const instalacao of instalacoes) {
                params = params.append('IdUsinaConjuntoUsina', instalacao.Id);
            }
        }
        if (instalacaoExcecao && instalacaoExcecao.length > 0) {
            for (const instalacao of instalacaoExcecao) {
                params = params.append('IdUsinaConjuntoUsinaExcecao', instalacao.Id);
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
                params = params.append('NomeCondicaoOperacao', condOperacao.Descricao);
            }
        }
        if (tipoInstalacao && tipoInstalacao.length > 0) {
            for (const tipoInst of tipoInstalacao) {
                params = params.append('NomeTipoUsinaConjuntoUsina', tipoInst.Descricao);
            }
        }
        if (agente && agente.length > 0) {
            for (const agent of agente) {
                params = params.append('NomeAgente', agent.Descricao);
            }
        }
        if (motivo && motivo.length > 0) {
            for (const motv of motivo) {
                params = params.append('IdMotivo', motv.Id);
            }
        }
        if (geracaoMinima) {
            params = params.append('GeracaoAtual', geracaoMinima);
        }

        if (fluxos && fluxos.length > 0) {
            for (const fluxo of fluxos) {
                params = params.append('IdTipoFluxo', fluxo.Id);
            }
        }

        if (sensibilidade !== ''
            && sensibilidade != null) {
            params = params.append('ValorFluxo', sensibilidade);
        }

        if (operadorMatematico !== ''
            && operadorMatematico != null) {
            params = params.append('Operador', operadorMatematico);
        }

        if (orderBy) {
            params = params.append('Sort', orderBy);
        }

        return params;
    }

    public atualizarGeracao(instalacao?: any[], instalacaoExcecao?: any[], area?: any[],
        pontoConexao?: any[], pontoConexaoExceto?: any[], condicaoOperacao?: any[],
        tipoInstalacao?: any[], agente?: any[], motivo?: any[], geracaoMinima?: any,
        fluxos?: any[], sensibilidade?: any, operadorMatematico?: string): Observable<any> {
        let params = this.updateParametros(instalacao, instalacaoExcecao, area, pontoConexao,
            pontoConexaoExceto, condicaoOperacao, tipoInstalacao, agente, motivo, geracaoMinima, fluxos, sensibilidade,
            operadorMatematico, undefined);
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}UsinaConjuntoUsina/AtualizarGeracao`,
            params, this.httpOptions);
    }

    public atualizarFluxos(instalacao?: any[], instalacaoExcecao?: any[], area?: any[],
        pontoConexao?: any[], pontoConexaoExceto?: any[], condicaoOperacao?: any[],
        tipoInstalacao?: any[], agente?: any[], motivo?: any[], geracaoMinima?: any,
        fluxos?: any[], sensibilidade?: any, operadorMatematico?: string): Observable<any> {
        let params = this.updateParametros(instalacao, instalacaoExcecao, area, pontoConexao,
            pontoConexaoExceto, condicaoOperacao, tipoInstalacao, agente, motivo, geracaoMinima, fluxos, sensibilidade,
            operadorMatematico, undefined);
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}FluxoSaci/AtualizarFluxos`,
            params, this.httpOptions);
    }

    public obterTotalizadoresPorAgente() : Observable<BaseResult<TotalizadorPorAgenteDto[]>> {
        return this.http.get<BaseResult<TotalizadorPorAgenteDto[]>>(`${this.baseService.urlApi}ExecucaoAcompanhamento/TotalizadoresPorAgente`);
    }

    public obterCortesCadastrados() : Observable<BaseResult<CorteCadastradoDto[]>> {
        return this.http.get<BaseResult<CorteCadastradoDto[]>>(`${this.baseService.urlApi}ExecucaoAcompanhamento/CortesCadastrados`);
    }

    public cancelarTodosOsCortes(...idsComando: number[]): Observable<BaseResult<any>> {
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}ExecucaoAcompanhamento/CancelarTodosOsCortes`, idsComando);
    }

    public enviarSinapse(idComando: number): Observable<BaseResult<any>> {
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}Sinapse/Enviar/${idComando}`, '');
    }

    public cancelarSinapse(idComando: number): Observable<BaseResult<any[]>> {
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}Sinapse/Cancelar/${idComando}`, '');
    }

    public informarCiencia(idComando: number): Observable<BaseResult<any[]>> {
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}Sinapse/InformarCiencia/${idComando}`, '');
    }

    public obterHistoricosDeCortesCadastrados(IdComandoOperacao: number): Observable<BaseResult<CorteCadastradoDto[]>> {
        return this.http.get<BaseResult<CorteCadastradoDto[]>>(`${this.baseService.urlApi}ExecucaoAcompanhamento/ObterHistoricosDeCortesCadastrados/${IdComandoOperacao}`);
    }

    public confirmarCorte(idComando: number): Observable<BaseResult<any[]>> {
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}ExecucaoAcompanhamento/ConfirmarCorte/${idComando}`, '');
    }

    public cancelarCorte(idComando: number): Observable<BaseResult<any[]>> {
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}ExecucaoAcompanhamento/CancelarCorte/${idComando}`, '');
    }

    public enviarSinapseMulti(...idsComando: number[]): Observable<BaseResult<any>> {
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}Sinapse/Enviar`, idsComando);
    }

}