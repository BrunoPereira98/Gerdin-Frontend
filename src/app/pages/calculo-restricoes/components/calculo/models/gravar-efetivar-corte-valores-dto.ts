export class GravarEfetivarCorteValoresDto {
    IdUsinaConjuntoUsina!: number;
    Corte!: number;
    NovoLimite!: number;
    PontoDePartida!: number;
    PotenciaInstalada!: number;
    GeracaoAtual!: number;

    constructor(IdUsinaConjuntoUsina: number,
        Corte: number,
        NovoLimite: number,
        PontoDePartida: number,
        PotenciaInstalada: number,
        GeracaoAtual: number) {
        this.IdUsinaConjuntoUsina = IdUsinaConjuntoUsina;
        this.Corte = Corte;
        this.NovoLimite = NovoLimite
        this.PontoDePartida = PontoDePartida;
        this.PotenciaInstalada = PotenciaInstalada;
        this.GeracaoAtual = GeracaoAtual;
    }
}