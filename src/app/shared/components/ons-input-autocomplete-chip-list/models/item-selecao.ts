import { TipoInstalacao } from 'src/app/shared/models/tipo-instalacao';

export class ItemSelecao{
    Id: string;
    Descricao: string;
    tipoInstalacao: TipoInstalacao | undefined;

    constructor (Id: string, Descricao: string, tipoInstalacao: TipoInstalacao | undefined) {
        this.Id = Id;
        this.Descricao = Descricao;
        this.tipoInstalacao = tipoInstalacao;
    }
}