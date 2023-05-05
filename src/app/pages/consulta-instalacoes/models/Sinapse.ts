import {StatusSinapseEnum} from "./StatusSinapseEnum";

export class Sinapse {
    Codigo!: string;
    Manual!: boolean;
    Online!: boolean;
    Justificativa!: string;
    IdStatusSinapse!: StatusSinapseEnum;
}
