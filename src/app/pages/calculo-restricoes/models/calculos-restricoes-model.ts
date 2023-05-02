import { CalculoRestricaoTotalizadoresModel } from './calculo-restricao-totalizadores-model';

export class CalculosRestricoesModel {
    content?: CalculoRestricaoTotalizadoresModel;
    errors?: any[];
    warnings?: any[];

    constructor(obj: CalculosRestricoesModel){
        obj && Object.assign(this, obj);
        if (obj.content) {
            this.content = new CalculoRestricaoTotalizadoresModel(obj.content);
        }
    }
}