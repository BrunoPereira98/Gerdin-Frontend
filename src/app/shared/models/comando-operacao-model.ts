import { StatusGERDINEnum } from '../components/enums/status-gerdin-enum';
import { Sinapse } from './Sinapse';

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
