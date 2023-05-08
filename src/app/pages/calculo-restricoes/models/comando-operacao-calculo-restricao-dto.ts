import { CondicaoOperacaoDto } from '../../../shared/models/condicao-operacao-dto';

export interface ComandoOperacaoCalculoRestricaoDto {
    IdAcaoOperacao: number;
    IdComandoOperacao: number;
    LimiteAtual: number;
    MotivoRestricao: string;
    CondicaoOperacao: CondicaoOperacaoDto;
}