import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from 'src/app/shared/services/base.service';
import { BaseResult } from 'src/app/shared/models/base-result';
import { MotivoRestricaoDto } from 'src/app/shared/models/motivo-restricao-dto';
import { AtualizarDadosCorteCommand } from '../models/atualizar-dados-corte-command';
import { ModalDeEdicaoDto } from '../models/modal-de-edicao-dto';

@Injectable({
    providedIn: 'root'
})
export class EdicaoComandoOperacaoService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private readonly http: HttpClient,
        private baseService: BaseService
    ) { }

    public consultarMotivoRestricao() : Observable<BaseResult<MotivoRestricaoDto[]>> {
        return this.http.get<BaseResult<MotivoRestricaoDto[]>>(`${this.baseService.urlApi}Filtro/ObterMotivosDeRestricao`);
    }

    public atualizarDadosDeCorte(atualizacao: AtualizarDadosCorteCommand): Observable<any> {
        return this.http.post<BaseResult<any>>(`${this.baseService.urlApi}ExecucaoAcompanhamento/AtualizarDadosDeCorte`,
        atualizacao, this.httpOptions);
    }

    public obterDadosDoModal(IdComandoOperacao: number) : Observable<BaseResult<ModalDeEdicaoDto>> {
        return this.http.get<BaseResult<ModalDeEdicaoDto>>(`${this.baseService.urlApi}ExecucaoAcompanhamento/ObterDadosDoModal/${IdComandoOperacao}`);
    }

}
