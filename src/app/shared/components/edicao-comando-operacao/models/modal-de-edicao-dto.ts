import { MotivoRestricaoModalDto } from './motivorestricao-modalsto';

export interface ModalDeEdicaoDto {
    IdComandoOperacao: number;
    IdUsinaConjuntoUsina: number;
    PotenciaInstalada: number;
    PontoDePartida: number;
    ValorDoLimite: number;
    ValorDoCorte: number;
    MotivoRestricao: MotivoRestricaoModalDto;
    Confirmacao: string;
    ConfirmacaoRegistroAnterior: string;
    ConfirmacaoRegistroPosterior: string;
    Observacao: string;
    NomeUsinaConjuntoUsina: string;
    NomeAgente: string;
}