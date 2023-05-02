import { FiltroUsinaDto } from '../../../models/filtro-usina-dto';

export interface FiltrosUsinaConjuntoUsinaDto {
    Instalacoes: FiltroUsinaDto[];
    CondicaoOperacao: string[];
    AgenteOperador: string[];
    TiposDeInstalacoes: string[];
    AreasEletricas: string[];
    PontosDeConexao: string[];
    Conexoes: string[];
    Siglas: string[];
}