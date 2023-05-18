import { CorteCadastradoDto } from 'src/app/pages/execucao-acompanhamento/models/corte-cadastrado-dto';
import { EdicaoComandoOperacaoForm } from "./edicao-comando-operacao-form";

export interface EdicaoComandoOperacaoParams extends EdicaoComandoOperacaoForm {
    NomeUsinaConjuntoUsina: string;
    Agente: string;
    PotenciaInstalada: number;
    LimiteAtual: number;
    Operacao: number;
    IdMotivo: number;
    Observacao: string;
    DataConfirmacao: Date;
    DataSolicitacao: Date;
    PontoPartida: number;
    IdComandoOperacao: number;
    
    // isFilho: boolean;
    // itemPai: CorteCadastradoDto;
    // idAcaoOperacao: number;
    // 
    // idUsinaConjuntoUsina: number;
}