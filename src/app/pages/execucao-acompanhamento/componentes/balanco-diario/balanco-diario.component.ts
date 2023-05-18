import { Component, Input, OnInit } from '@angular/core';
import { CorteCadastradoDto } from '../../models/corte-cadastrado-dto';

@Component({
    selector: 'app-balanco-diario',
    templateUrl: './balanco-diario.component.html',
    styleUrls: ['./balanco-diario.component.scss']
})
export class BalancoDiarioComponent implements OnInit {

    expandido: Boolean = false;
    finalizado = false;
    finalizadoEntrada = false;

    @Input() cortes!: CorteCadastradoDto[];

    constructor() {
    }

    ngOnInit() {
    }

    obterLimiteTotal() {
        if (!this.cortes) {
            return 0;
        }
        return this.cortes.reduce((a, b) => a + (b.LimiteAtual ? b.LimiteAtual : 0), 0);
    }

    obterGeracaoVerificada() {
        if (!this.cortes) {
            return 0;
        }
        return this.cortes.reduce((a, b) => a + (b.GeracaoAtual ? b.GeracaoAtual.Geracao : 0), 0);
    }

    obterGeracaoAcimaLimite() {
        if (!this.cortes) {
            return 0;
        }
        return this.cortes.reduce((a, b) => a + (b.GeracaoAtual ? b.GeracaoAtual.Geracao : 0), 0)
                - this.cortes.reduce((a, b) => a + (b.LimiteAtual ? b.LimiteAtual : 0), 0);
    }

    expandir() {
        this.expandido = !this.expandido;
    }

    atualizar (value: boolean) {
        this.finalizado = value;

        if (this.finalizado) {
            this.finalizadoEntrada = this.finalizado;
        }
    }

}
