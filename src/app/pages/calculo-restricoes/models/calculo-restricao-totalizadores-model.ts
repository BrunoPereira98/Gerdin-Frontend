import { CalculoRestricaoModel } from './calculo-restricao-model';

export class CalculoRestricaoTotalizadoresModel {
    Resultados?: CalculoRestricaoModel[];
    TotalGeracaoAtual!: number;
    TotalLimiteAtual!: number;
    TotalPotenciaInstalada!: number;
    DataDaUltimaAtualizacao!: Date;

    constructor(obj: CalculoRestricaoTotalizadoresModel){
        obj && Object.assign(this, obj);
        this.Resultados = this.Resultados?.map(x => new CalculoRestricaoModel(x));
    }
}
