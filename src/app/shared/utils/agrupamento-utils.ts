import { AgrupamentoDTO } from '../models/agrupamento-dto';

export class AgrupamentoUtils {

    public agrupar(lista: any, campo: string) {
        let agrupamentoDTO: AgrupamentoDTO;
        let agrupamentoDTOPesq: any;
        const campos: any[] = campo.split('.');
        const listaAgrupamentoDTO: AgrupamentoDTO[] = [];

        lista.forEach((item: any) => {
            if (listaAgrupamentoDTO.length > 0) {
                agrupamentoDTOPesq = listaAgrupamentoDTO.find(existente => existente.Nome === this.obterValorCampo(item,campos));
            }

            if (!agrupamentoDTOPesq) {
                agrupamentoDTO = new AgrupamentoDTO();
                agrupamentoDTO.Nome = this.obterValorCampo(item,campos);
                listaAgrupamentoDTO.push(agrupamentoDTO);
            } else {
                agrupamentoDTO = agrupamentoDTOPesq;
            }

            if (!agrupamentoDTO.Itens) {
                agrupamentoDTO.Itens = [];
            }
            agrupamentoDTO.Itens.push(item);
        });

        return listaAgrupamentoDTO;
    }

    obterValorCampo(itemP: any, campos: any[]) {
        let item = itemP;

        campos.forEach(campo => {
            item = item[campo];
        });

        return item;
    }
}
