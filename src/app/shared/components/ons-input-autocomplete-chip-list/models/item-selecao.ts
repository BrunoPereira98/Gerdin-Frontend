import { FonteDto } from 'src/app/shared/models/fonte-dto';

export class ItemSelecao{
    Id: string;
    Descricao: string;
    fonte: FonteDto | undefined;

    constructor (Id: string, Descricao: string, fonte: FonteDto | undefined) {
        this.Id = Id;
        this.Descricao = Descricao;
        this.fonte = fonte;
    }
}