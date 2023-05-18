import { HistoricoCorteComponent } from 'src/app/pages/execucao-acompanhamento/componentes/historico-corte/historico-corte.component';
import { CorteCadastradoDto } from 'src/app/pages/execucao-acompanhamento/models/corte-cadastrado-dto';


export interface EdicaoComandoOperacaoReturn {
    dados: CorteCadastradoDto;
    historicos: HistoricoCorteComponent[];
}