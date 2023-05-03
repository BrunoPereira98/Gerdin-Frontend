import { StatusSinapseEnum } from '../components/enums/status-sinapse-enum';


export class Sinapse {
    Codigo!: string;
    Manual!: boolean;
    Online!: boolean;
    Justificativa!: string;
    IdStatusSinapse!: StatusSinapseEnum;
}
