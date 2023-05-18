import {Component, OnInit} from '@angular/core';
import {ExecucaoAcompanhamentoService} from '../../services/execucao-acompanhamento.service';
import { TotalizadorPorAgenteDto } from '../../models/totalizador-por-agente-dto';

@Component({
    selector: 'app-totalizador-agente',
    templateUrl: './totalizador-agente.component.html',
    styleUrls: ['./totalizador-agente.component.scss']
})
export class TotalizadorAgenteComponent implements OnInit {

    agentes!: TotalizadorPorAgenteDto[];
    step = 0;
    finalizado = false;
    finalizadoEntrada = false;

    constructor(private service: ExecucaoAcompanhamentoService) {
    }

    ngOnInit() {
    }

    init() {
        this.service.obterTotalizadoresPorAgente().subscribe(ag => {
            this.agentes = ag.content;
        });
    }

    arredondar(valor: number) {
        return Math.round(valor);
    }

    atualizar(value: boolean) {
        this.finalizado = value;

        if (this.finalizado) {
            this.finalizadoEntrada = this.finalizado;
        }
    }

    isFinalizado() {
        return this.finalizadoEntrada;
    }

}
