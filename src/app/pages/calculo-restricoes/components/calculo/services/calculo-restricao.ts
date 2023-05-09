import { MatTableDataSource } from '@angular/material/table';
import { CalculoRestricaoDto } from '../../../models/calculo-restricao-dto';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CalculoRestricao {

    valorDaRestricao: number = 0;
    dataSource!: MatTableDataSource<CalculoRestricaoDto>;
    ehLiberacao!: boolean;
    valorDaRestricaoMsg!: number;
    geracao!: number;

    constructor(
        private readonly alert: AlertService,
    ) {
    }

    calcular(valorDaRestricao: number, dataSource: MatTableDataSource<CalculoRestricaoDto>) {
        this.valorDaRestricao = valorDaRestricao;
        this.dataSource = dataSource;

        if (!this.valorDaRestricao) {
            this.alert.warn('O campo restrição total deve ser preenchido!');
            return;
        }

        if (this.valorDaRestricao === 0) {
            this.alert.warn('O campo restrição total deve ser maior que zero!');
            return;
        }

        if (this.valorDaRestricao < 0) {
            this.calcularUmValorNegativo();
        } else {
            this.calcularUmValorPositivo();
        }

        if  (!this.valido()) {
            this.alert.warn('Não foi possível ' + (this.ehLiberacao ? 'liberar ' : 'cortar ') +
            (this.valorDaRestricaoMsg - this.geracao) + ' dos ' + this.valorDaRestricaoMsg +
            ' MW solicitados com as usinas dispostas na GRID.');
        }
    }

    valido() {
        this.ehLiberacao = this.valorDaRestricao < 0;
        this.valorDaRestricaoMsg = this.ehLiberacao ? this.valorDaRestricao * -1 : this.valorDaRestricao;

        this.geracao = this.dataSource.data.reduce((a, b) => a + b.obterValorPraCalcular(), 0);

        if (!this.ehLiberacao) return this.valorDaRestricaoMsg <= this.geracao;

        this.geracao -= this.dataSource.data.reduce((a, b) => a + (b.UsinaConjuntoUsina ? b.UsinaConjuntoUsina.PotenciaInstalada : 0), 0);

        if (this.geracao < 0)
            this.geracao *= -1;

        return this.valorDaRestricaoMsg <= this.geracao;
    }

    calcularUmValorNegativo() {
        let valorRestricao = this.valorDaRestricao * -1;

        let somaTodosLimites = 0;

        this.dataSource.data.forEach(item => {
            somaTodosLimites += item.obterValorPraCalcular();
            item.ValorCalculado = 0;
        });

        var somaPotenciaInstalada = 0;

        this.dataSource.data.forEach(item => {
            somaPotenciaInstalada += item.UsinaConjuntoUsina ? item.UsinaConjuntoUsina.PotenciaInstalada : 0;
        });

        this.dataSource.data.forEach(item => {
            let valor = item.obterValorPraCalcular();
            let potenciaInstalada = item.UsinaConjuntoUsina ? item.UsinaConjuntoUsina.PotenciaInstalada : 0;

            let valorCalculado = Math.round(valorRestricao *
                ((potenciaInstalada - valor) / (somaPotenciaInstalada - somaTodosLimites)));

            // valor do corte não pode ultrapassar a potencia instalada
            valorCalculado = valorCalculado > potenciaInstalada ? potenciaInstalada : valorCalculado;
            item.ValorCalculado = valorCalculado;

            let novoLimite = valor + (valorCalculado);

            // valor do novo limite não pode ser menor q zero
            novoLimite = novoLimite < 0 ? 0 : novoLimite;

            // valor do novo limite não pode ultrapassar a potencia instalada
            novoLimite = novoLimite > potenciaInstalada ? potenciaInstalada : novoLimite;
            item.ValorCalculado = valorCalculado * -1;
            item.NovoLimite = novoLimite;
        });
    }

    calcularUmValorPositivo() {
        let somaTodosLimites = 0;

        this.dataSource.data.forEach(item => {
            somaTodosLimites += item.obterValorPraCalcular();
            item.ValorCalculado = 0;
        });

        this.dataSource.data.forEach(item => {
            let valorParaCalculo = item.obterValorPraCalcular();

            if (valorParaCalculo !== 0) {
                let valorCalculado = Math.round(valorParaCalculo / somaTodosLimites * this.valorDaRestricao);

                valorCalculado = valorCalculado > valorParaCalculo ? valorParaCalculo : valorCalculado;

                item.ValorCalculado = valorCalculado;

                let novoLimite = valorParaCalculo - valorCalculado;

                // valor do novo limite não pode ser menor q zero
                novoLimite = novoLimite < 0 ? 0 : novoLimite;
                item.NovoLimite = novoLimite;
            } else {
                item.NovoLimite = 0;
            }
        });
    }

}
