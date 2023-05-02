import { TipoInstalacao } from 'src/app/shared/models/tipo-instalacao';

export class FiltroUsinaDto{
    Id!: number;
    Nome!: string;
    TipoInstalacao!: TipoInstalacao;
}