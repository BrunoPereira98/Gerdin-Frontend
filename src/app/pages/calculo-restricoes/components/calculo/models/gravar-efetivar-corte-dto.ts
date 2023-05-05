import { GravarEfetivarCorteValoresDto } from './gravar-efetivar-corte-valores-dto';

export class GravarEfetivarCorteDto {
    idMotivoRestricao!: number;
    Observacao!: string;
    Cortes!: GravarEfetivarCorteValoresDto[];

    constructor () {
        
    }
   
}