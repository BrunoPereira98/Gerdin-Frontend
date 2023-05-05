import { ComandoOperacaoCalculoRestricaoDto } from './comando-operacao-calculo-restricao-dto';
import { UsinaConjuntoUsinaCalculoRestricaoDto } from './usina-conjunto-usina-calculo-restricao-dto';

export class CalculoRestricaoDto {
    UsinaConjuntoUsina?: UsinaConjuntoUsinaCalculoRestricaoDto;
    ComandoOperacao?: ComandoOperacaoCalculoRestricaoDto;
    ValorCalculado: number = 0;
    NovoLimite!: number;
    ReducaoVerificada!: number;

    constructor(obj: CalculoRestricaoDto) {
        obj && Object.assign(this, obj);
    }

    public obterValorParaCalculo(): number {
        if (this.estaLimitada()
            && this.ComandoOperacao?.LimiteAtual) {
            return Math.round(this.ComandoOperacao?.LimiteAtual);
        }

        return Math.round(this.UsinaConjuntoUsina ? this.UsinaConjuntoUsina.GeracaoAtual.Geracao : 0);
    }

    public calcular() {
        if (!this.estaValidoParaCalcular()) {
            this.limparDadosCalculo();
            return;
        }
        this.ValorCalculado = this.obterValorParaCalculo() - (this.NovoLimite ? this.NovoLimite : 0);
    }

    public limitarGeracao() {
        this.NovoLimite = this.obterValorParaCalculo();
        this.calcular();
    }

    public liberarGeracao() {
        this.NovoLimite = Math.round(this.UsinaConjuntoUsina ? this.UsinaConjuntoUsina.PotenciaInstalada : 0);
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
        return this.ComandoOperacao !== null && this.ComandoOperacao?.LimiteAtual !== null;
    }

    public possuiGeracao(): boolean {
        return this.UsinaConjuntoUsina !== null && this.UsinaConjuntoUsina?.GeracaoAtual?.Geracao !== null;
    }
}