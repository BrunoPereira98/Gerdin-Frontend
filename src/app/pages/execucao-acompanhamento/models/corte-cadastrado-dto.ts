import { CondicaoOperacaoDto } from 'src/app/shared/models/condicao-operacao-dto';
import { ConexaoDto } from 'src/app/shared/models/conexao-dto';
import { GeracaoAtualDto } from 'src/app/shared/models/geracao-atual-dto';
import { IntegracaoSinapseDto } from './integracao-sinapse-dto';
import { HistoricosDeStatusDto } from './historicos-de-status-dto';
import { FonteDto } from 'src/app/shared/models/fonte-dto';
import { StatusGERDINEnum } from 'src/app/shared/components/enums/status-gerdin-enum';
import { StatusSinapseEnum } from 'src/app/shared/components/enums/status-sinapse-enum';
import { TipoSistemaEnum } from 'src/app/shared/components/enums/tipo-sistema-enum';
import { DatePipe } from '@angular/common';

export class CorteCadastradoDto {
    IdUsinaConjuntoUsina!: number;
    IdAcaoOperacao!: number;
    IdTipoMotivoRestricao!: number;
    IdComandoOperacao!: number;
    NomeUsinaConjuntoUsina!: string;
    Fonte!: FonteDto;
    Agente!: string;
    Conexao!: ConexaoDto;
    PotenciaInstalada!: number;
    GeracaoAtual!: GeracaoAtualDto;
    CondicaoOperacao!: CondicaoOperacaoDto;
    LimiteAtual!: number;
    Operacao!: number;
    IdMotivoRestricao!: number;
    MotivoRestricao!: string;
    IdStatusSolicitacao!: number;
    StatusSolicitacao!: string;
    IntegracaoSinapse?: IntegracaoSinapseDto;
    HistoricoDeAlteracaoDeStatus?: HistoricosDeStatusDto[];
    Criticidade!: number;
    Observacao!: string;
    // PontoPartida!: number;

    private readonly datePipe: DatePipe = new DatePipe('pt-BR');

    constructor(obj: CorteCadastradoDto) {
        obj && Object.assign(this, obj);
    }

    isExibirStatusGERDIN(): boolean {
        return !this.isVisualizarCancelar()
            && !this.isVisualizarConfirmar();
    }

    isVisualizarCancelar(): boolean {
        return (
            // É pendente Gerdin e
            this.IdStatusSolicitacao === StatusGERDINEnum.Pendente
            &&
            (
                // Erro SINapse
                this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.Erro
                // ou Cancelado SINapse
                || this.isCanceladoSINapse()
                // ou NÃO é integrado sinapse
                || !this.isIntegradoSINapse()
            )
        );
    }

    isVisualizarConfirmar(): boolean {
        return (
            // É pendente Gerdin e
            this.IdStatusSolicitacao === StatusGERDINEnum.Pendente
            &&
            (
                // Erro SINapse
                this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.Erro
                // ou Cancelado SINapse
                || this.isCanceladoSINapse()
                // ou NÃO é integrado sinapse
                || !this.isIntegradoSINapse()
            )
        );
    }

    isCanceladoSINapse(): boolean {
        return this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.Cancelada
            && this.isIntegradoSINapse();
    }

    isIntegradoSINapse(): boolean {
        return this.IntegracaoSinapse !== null
                && this.IntegracaoSinapse !== undefined;
    }

    obterValorCorte() {
        if (this.Operacao < 0 && this.CondicaoOperacao.DirecaoDoCorte === 1) {
            return this.Operacao * (-1);
        } else {
            return this.Operacao;
        }
    }

    isComandoManual() {
        return !this.IntegracaoSinapse;
    }

    obterIconeCorteElevacao() {
        switch (this.CondicaoOperacao.DirecaoDoCorte) {
            case 1:
                return 'assets/up.png';
            case 2:
                return 'assets/down.png';
            default:
                return '';
        }
    }

    isVisualizarAcaoEditarLaranja(): boolean {
        return this.Observacao != null && this.Observacao !== '';
    }

    obterStatusGERDIN() {
        if (this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.ConfirmadaImpedida
            || this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.Finalizada
            || this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.Confirmada
            || this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.CienciaInformada) {
            return '-';
        }

        switch (this.IdStatusSolicitacao) {
            case StatusGERDINEnum.Confirmada:
                return 'Confirmada';
            default:
                return '-';
        }
    }

    obterStatusSINAPSE() {
        const valueDefault = '-';

        if (!this || !this.CondicaoOperacao) {
            return valueDefault;
        }

        return this.obterDescricaoStatusSINapse(this, valueDefault);
    }

    obterDescricaoStatusSINapse(item: CorteCadastradoDto, valueDefault?: string): any {
        switch (item.IdStatusSolicitacao) {
            case StatusSinapseEnum.PendenteImpedida:
                return 'Pendente/Impedida';
            case StatusSinapseEnum.Confirmada:
                return 'Confirmada';
            case StatusSinapseEnum.Cancelada:
                return item.IntegracaoSinapse?.IdStatusSolicitacao == StatusGERDINEnum.Confirmada
                    ? valueDefault
                    : 'Cancelada';
            case StatusSinapseEnum.Pendente:
                return 'Pendente';
            case StatusSinapseEnum.Finalizada:
                if (item.HistoricoDeAlteracaoDeStatus) {
                    const ultimoHistoricoSINapseAntesDoFinalizado = item.HistoricoDeAlteracaoDeStatus
                        .filter((x: any) => x.Sistema === TipoSistemaEnum.SINapse && x.IdStatusSolicitacao !== StatusSinapseEnum.Finalizada)
                        // decrescente
                        .sort((a: HistoricosDeStatusDto, b: HistoricosDeStatusDto) => new Date(a.Alteracao) > new Date(b.Alteracao) ? -1 : 1)
                        // first or default
                        .find(() => true);
                    return ultimoHistoricoSINapseAntesDoFinalizado
                        ? this.obterDescricaoStatusSINapse(item, valueDefault)
                        : valueDefault;
                } else {
                    return valueDefault;
                }
            case StatusSinapseEnum.Erro:
                return 'Erro';
            case StatusSinapseEnum.ConfirmadaImpedida:
                return 'Confirmada/Impedida';
            case StatusSinapseEnum.CienciaInformada:
                return 'Ciência Informada';
            default:
                return valueDefault;
        }
    }

    obterTooltipHorarioStatus() {
        let tooltip = '';

        if (this.HistoricoDeAlteracaoDeStatus) {
            const historicoComandoOperacaoModels = this.HistoricoDeAlteracaoDeStatus
                .filter(x => x.IdStatusAlteracao !== StatusSinapseEnum.Finalizada || x.Sistema !== TipoSistemaEnum.SINapse);
            historicoComandoOperacaoModels.forEach(historico => {
                const data = this.datePipe.transform(historico.Alteracao, 'dd/MM/yyyy HH:mm');
                tooltip = (tooltip ? tooltip : '') + (historico.Usuario ? historico.Usuario : '').concat(' - ')
                    .concat(data ? data : '')
                    .concat(' - ').concat(this.obterStatusToTooltip(historico))
                    .concat(' ').concat(historico.Sistema)
                    .concat('\n');
            });
        }

        return tooltip;
    }

    private obterStatusToTooltip(historico: HistoricosDeStatusDto): string {
        return historico.Sistema == TipoSistemaEnum.Gerdin
            ? this.obterStatusGerdinToTooltip(historico.IdStatusAlteracao)
            : this.obterStatusSINapseToTooltip(historico.IdStatusAlteracao);
    }

    private obterStatusGerdinToTooltip(status: number): string {
        switch (status) {
            case StatusGERDINEnum.Pendente:
                return "Criada";
            case StatusGERDINEnum.Confirmada:
                return "Confirmada";
            case StatusGERDINEnum.Cancelada:
                return "Cancelada";
            default:
                return "-";
        }
    }

    private obterStatusSINapseToTooltip(status: number) {
        switch (status) {
            case StatusSinapseEnum.Pendente:
                return "Pendente";
            case StatusSinapseEnum.Confirmada:
                return "Confirmada";
            case StatusSinapseEnum.Cancelada:
                return "Cancelada";
            case StatusSinapseEnum.Finalizada:
                return "Finalizada";
            case StatusSinapseEnum.Erro:
                return "Erro";
            case StatusSinapseEnum.PendenteImpedida:
            case StatusSinapseEnum.ConfirmadaImpedida:
                return "Impedida";
            case StatusSinapseEnum.CienciaInformada:
                return "Ciência Informada";
            default:
                return "-";
        }
    }

    getUltimoHorarioStatus() {
        if (!this.HistoricoDeAlteracaoDeStatus) {
          return '';
        }
    
        const data = this.HistoricoDeAlteracaoDeStatus[0].Alteracao;
        
        return this.datePipe.transform(data, 'dd/MM/yyyy HH:mm');
    }

    getDataUltimoHorarioStatus() {
        if (!this.HistoricoDeAlteracaoDeStatus) {
          return '';
        }
    
        const data = this.HistoricoDeAlteracaoDeStatus[0].Alteracao;
        
        return new Date(data);
    }

    isVisualizarAcao(): boolean {
        return this.IdStatusSolicitacao === StatusGERDINEnum.Confirmada;
    }

    isInformarCiencia() {
        return this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.ConfirmadaImpedida
            || this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.PendenteImpedida;
    }

    isSemAcaoSINapse(): boolean  {
        return ((!this.isEnviarSinapse()
            && !this.isCancelarSinapse()
            && !this.isInformarCiencia())
            );
    }

    isEnviarSinapse(): boolean {
        return !this.isIntegradoSINapse()
            && this.IdStatusSolicitacao === StatusGERDINEnum.Pendente;
    }

    isCancelarSinapse(): boolean {
        return this.isIntegradoSINapse()
            && this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.Pendente;
    }

    isExibirStatusAgente(): boolean {
        return !this.isEnviarSinapse()
            && this.IntegracaoSinapse?.IdStatusSolicitacao === StatusSinapseEnum.Pendente;
    }

    isCanceladoManual(): boolean {
        return this.IdStatusSolicitacao === StatusGERDINEnum.Cancelada
            && this.isComandoManual();
    }

}