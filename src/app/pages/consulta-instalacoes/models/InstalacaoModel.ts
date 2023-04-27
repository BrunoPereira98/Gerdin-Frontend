import {GeracaoInstalacaoModel} from "./geracao-instalacao-model";
import {TipoInstalacao} from "./TipoInstalacao";
import {ComandoOperacaoModel} from "./comando-operacao-model";

export class InstalacaoModel {
    IdUsinaConjuntoUsina!: number;
    Instalacao!: string;
    NomeInstalacao!: string;
    IdAgente!: string;
    Agente!: string;
    PontoConexao!: string;
    Area!: string;
    TipoInstalacao!: TipoInstalacao;
    NomeCondicaoOperacao!: string;
    CondicaoOperacao!: string;
    NomeIdoOns!: string;
    SiglaIdoOns!: string;
    NomeConexao!: string;
    SiglaConexao!: string;
    PotenciaInstalada!: number;
    ComandoOperacao!: ComandoOperacaoModel;
    GeracaoInstalacao!: GeracaoInstalacaoModel;
}
