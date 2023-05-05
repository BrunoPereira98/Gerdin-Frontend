import {Sinapse} from "./Sinapse";
import {StatusGERDINEnum} from "./StatusGERDINEnum";

/** Atenção essa class deve ser equivalente a class ComandoOperacaoModel da API  */
export class ComandoOperacaoModel {
    Id!: number;
    DataSolicitacao!: Date;
    DataConfirmacao!: Date;
    ValorCorte!: number;
    PontoPartida!: number;
    LimiteAtual!: number;
    StatusSolicitacao!: StatusGERDINEnum;
    Integracao!: Sinapse;
    Observacao!: string;
}
