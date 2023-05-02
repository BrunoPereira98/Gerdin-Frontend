import { TipoInstalacao } from 'src/app/shared/models/tipo-instalacao';
import { ComandoOperacaoCalculoModel } from './comando-operacao-calculo-model';
import { GeracaoInstalacaoModel } from 'src/app/shared/models/geracao-instalacao-model';
import { Fluxo } from 'src/app/shared/models/fluxo';

export class CalculoRestricaoModel {
    public IdTipoMotivoRestricao!: number;
    public Motivo!: string;
    public IdSituacaoUsina!: number;
    public SituacaoUsina!: string;
    public DirecaoSituacaoUsina!: string;
    public IdUsinaConjuntoUsina!: number;
    public Instalacao!: string;
    public NomeInstalacao!: string;
    public IdAgente!: number;
    public Agente!: string;
    public PontoConexao!: string;
    public Area!: string;
    public TipoInstalacao!: TipoInstalacao;
    public NomeCondicaoOperacao!: string;
    public CondicaoOperacao!: string;
    public NomeIdoOns!: string;
    public SiglaIdoOns!: string;
    public NomeConexao!: string;
    public SiglaConexao!: string;
    public PotenciaInstalada!: number;
    public ComandoOperacao!: ComandoOperacaoCalculoModel;
    public GeracaoInstalacao!: GeracaoInstalacaoModel;
    public ValorCalculado!: number;
    public NovoLimite!: number;
    public ReducaoVerificada!: number;
    public Fluxo!: Fluxo;

    constructor(obj: CalculoRestricaoModel) {
        obj && Object.assign(this, obj);
    }

    public obterValorParaCalculo(): number {
        if (this.estaLimitada()) {
            return Math.round(this.ComandoOperacao.LimiteAtual);
        }

        return Math.round(this.GeracaoInstalacao.GeracaoAtual);
    }

    public calcular() {
        if (!this.estaValidoParaCalcular()) {
            this.limparDadosCalculo();
            return;
        }
        this.ValorCalculado = this.obterValorParaCalculo() - this.NovoLimite;
    }

    public limitarGeracao() {
        this.NovoLimite = this.obterValorParaCalculo();
        this.calcular();
    }

    public liberarGeracao() {
        this.NovoLimite = Math.round(this.PotenciaInstalada);
        this.calcular();
    }

    public retirarGeracao() {
        this.NovoLimite = 0;
        this.calcular();
    }

    public limparDadosCalculo() {
        this.ValorCalculado = 0;
    }

    private estaValidoParaCalcular(): boolean {
        return this.NovoLimite !== null && (this.estaLimitada() || this.possuiGeracao());
    }

    public estaLimitada(): boolean {
        return this.ComandoOperacao !== null && this.ComandoOperacao.LimiteAtual !== null;
    }

    public possuiGeracao(): boolean {
        return this.GeracaoInstalacao !== null && this.GeracaoInstalacao.GeracaoAtual !== null;
    }
}

export class FiltroCalculo {
    public Instalacao!: string[];
    public Agente!: string[];
    public PontoConexao!: string[];
    public Area!: string[];
    public CondicaoOperacao!: string[];
    public Motivo!: string[];

    public constructor(init?: Partial<FiltroCalculo>) {
        Object.assign(this, init);
    }
}

export class Valores {
    content?: CalculoRestricaoModel[];
    errors?: any[];
    warnings?: any[];
}
