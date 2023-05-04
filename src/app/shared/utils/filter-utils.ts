import {HttpParams} from "@angular/common/http";

export class FilterUtils {
  public updateParametros(instalacoes?: any[], instalacaoExcecao?: any[], area?: any[],
                          pontoConexao?: any[], pontoConexaoExceto?: any[], condicaoOperacao?: any[],
                          tipoInstalacao?: any[], agente?: any[], motivo?: any[], geracaoMinima?: any,
                          fluxos?: any[], sensibilidade?: any, operadorMatematico?: string, orderBy?: string): HttpParams {
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

    if (operadorMatematico !== ''
      && operadorMatematico != null) {
      params = params.append('Operador', operadorMatematico);
    }

    if (orderBy) {
      params = params.append('Sort', orderBy);
    }

    return params;
  }
}
