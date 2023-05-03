import { EstadoDaUsinaEnum } from 'src/app/shared/components/enums/estado-da-usina-enum';
import { ComandoOperacaoModel } from 'src/app/shared/models/comando-operacao-model';

/** Atenção essa class deve ser equivalente a class ComandoOperacaoCalculoModel da API  */
export class ComandoOperacaoCalculoModel extends ComandoOperacaoModel {
    IdTipoMotivoRestricao!: number;
    NomeMotivo!: string;
    Motivo!: string;
    IdSituacaoUsina!: number;
    SituacaoUsina!: string;
    DirecaoSituacaoUsina!: string;
    EstadoDaUsina!: EstadoDaUsinaEnum
}
