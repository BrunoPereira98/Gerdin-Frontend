import { TipoInstalacao } from 'src/app/shared/models/TipoInstalacao';

export interface FiltroUsinaDto{
    Id: number;
    Nome: string;
    TipoInstalacao: TipoInstalacao;
}