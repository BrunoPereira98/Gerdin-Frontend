import { TipoFluxo } from './tipo-fluxo';
import { UsinaConjuntoUsina } from './usina-conjunto-usina';

export class Fluxo {
    Id!: number;
    Description!: string;
    IdUsinaConjuntoUsina!: number;
    IdTipoFluxo!: number;
    Valor!: number;
    UltimaCaptura!: string;
    UsinaConjuntoUsina!: UsinaConjuntoUsina;
    TipoFluxo!: TipoFluxo;
}