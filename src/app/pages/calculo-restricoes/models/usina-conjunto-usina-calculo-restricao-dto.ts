import { FonteDto } from 'src/app/shared/models/fonte-dto';
import { CondicaoOperacaoCalculoRestricaoDto } from './condicao-operacao-calculo-restricao-dto';
import { ConexaoDto } from './conexao-dto';
import { FluxoSaciCalculoRestricaoDto } from './fluxo-saci-calculo-restricao-dto';
import { GeracaoAtualDto } from './geracao-atual-dto';

export interface UsinaConjuntoUsinaCalculoRestricaoDto {
    Id: number;
    Nome: string;
    PotenciaInstalada: number;
    Area: string;
    Agente: string;
    GeracaoAtual: GeracaoAtualDto;
    Fonte: FonteDto;
    Conexao: ConexaoDto;
    CondicaoOperacao: CondicaoOperacaoCalculoRestricaoDto;
    FluxoSaci: FluxoSaciCalculoRestricaoDto;
}