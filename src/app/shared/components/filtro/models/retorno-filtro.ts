import { ItemSelecao } from '../../ons-input-autocomplete-chip-list/models/item-selecao';


interface RetornoFiltroInterface {
    geracaoMinimaFiltro?: number;
    sensibilidadeFiltro?: number;
    operadorMatematicoFiltro?: string;
    dataInicialFiltro?: Date;
    dataFinalFiltro?: Date;
    instalacaoFiltro?: ItemSelecao;
    instalacaoExcecaoFiltro?: ItemSelecao;
    pontoConexaoFiltro?: ItemSelecao;
    pontoConexaoExcecaoFiltro?: ItemSelecao;
    fluxoSACIFiltro?: ItemSelecao;
    condicaoOperacaoFiltro?: ItemSelecao;
    tipoInstalacaoFiltro?: ItemSelecao;
    agenteFiltro?: ItemSelecao;
    areaFiltro?: ItemSelecao;
    motivoFiltro?: ItemSelecao;
}

export class RetornoFiltro implements RetornoFiltroInterface {
    constructor(
        public geracaoMinimaFiltro?: number,
        public sensibilidadeFiltro?: number,
        public operadorMatematicoFiltro?: string,
        public dataInicialFiltro?: Date,
        public dataFinalFiltro?: Date,
        public instalacaoFiltro?: ItemSelecao,
        public instalacaoExcecaoFiltro?: ItemSelecao,
        public pontoConexaoFiltro?: ItemSelecao,
        public pontoConexaoExcecaoFiltro?: ItemSelecao,
        public fluxoSACIFiltro?: ItemSelecao,
        public condicaoOperacaoFiltro?: ItemSelecao,
        public tipoInstalacaoFiltro?: ItemSelecao,
        public agenteFiltro?: ItemSelecao,
        public areaFiltro?: ItemSelecao,
        public motivoFiltro?: ItemSelecao,
    ) { }
}