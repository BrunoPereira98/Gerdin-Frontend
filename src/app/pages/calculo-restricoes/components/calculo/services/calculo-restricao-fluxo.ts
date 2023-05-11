import { MatTableDataSource } from '@angular/material/table';
import { CalculoRestricaoDto } from '../../../models/calculo-restricao-dto';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';
import { AgrupamentoUtils } from 'src/app/shared/utils/agrupamento-utils';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CalculoRestricaoFluxo {

    valorDaRestricao: number = 0;
    dataSource!: MatTableDataSource<CalculoRestricaoDto>;
    ehLiberacao!: boolean;
    valorDaRestricaoMsg!: number;
    reducaoVerificada!: number;

    constructor(
        private readonly alert: AlertService,
    ) {
    }

    calcular(valorDaRestricao: number, dataSource: MatTableDataSource<CalculoRestricaoDto>, nmFluxo: string) {
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
            (this.valorDaRestricaoMsg - this.reducaoVerificada) + ' dos ' + this.valorDaRestricaoMsg +
            ' MW solicitados do fluxo ' + nmFluxo +
            ' com as usinas dispostas na GRID.');
        }
    }

    valido() {
        this.ehLiberacao = this.valorDaRestricao < 0;
        this.valorDaRestricaoMsg = this.ehLiberacao ? this.valorDaRestricao * -1 : this.valorDaRestricao;

        this.reducaoVerificada = Math.round(
            this.dataSource.data.reduce((a, b) => a + this.calcularReducaoVerificada(b.obterValorPraCalcular(), 
            (b.UsinaConjuntoUsina ? b.UsinaConjuntoUsina.FluxoSaci.Valor : 0)), 0));

        if (!this.ehLiberacao) return this.valorDaRestricaoMsg <= this.reducaoVerificada;

        this.reducaoVerificada -= this.dataSource.data.reduce((a, b) => a + (b.UsinaConjuntoUsina ? b.UsinaConjuntoUsina.PotenciaInstalada : 0), 0);

        if (this.reducaoVerificada < 0)
        this.reducaoVerificada *= -1;

        return this.valorDaRestricaoMsg <= this.reducaoVerificada;
    }

    calcularUmValorPositivo() {
        let agrupamento = new AgrupamentoUtils();
        let fluxosOrdenadosParaCorte = agrupamento.agrupar(this.dataSource.data, 'UsinaConjuntoUsina.FluxoSaci.Valor');

        fluxosOrdenadosParaCorte.sort();

        let restanteRestricao: number = this.valorDaRestricao;

        fluxosOrdenadosParaCorte.forEach(grupo => {
            let totalGrupo = grupo.Itens.reduce((a, b) => a + b.obterValorPraCalcular(), 0);

            let reducaoVerificadaParaCalculo = this.calcularReducaoVerificada(totalGrupo, Number(grupo.Nome)) ?? 0;

            let proporcaoCortePorItem = restanteRestricao >= reducaoVerificadaParaCalculo ? 1 : reducaoVerificadaParaCalculo == 0 ? 0 : (restanteRestricao / reducaoVerificadaParaCalculo);

            grupo.Itens.forEach((item: CalculoRestricaoDto) => {
                let valorParaCalculo = item.obterValorPraCalcular();

                if (valorParaCalculo !== 0) {
                    let valorCalculado = Math.round(valorParaCalculo * proporcaoCortePorItem);
                    // Descontar redução verificada da total a ser restrito
                    var valorReducaoVerificaAplicada = this.calcularReducaoVerificada(valorCalculado, Number(grupo.Nome)) ?? 0;

                    restanteRestricao -= valorReducaoVerificaAplicada;

                    var novoLimite = valorParaCalculo - valorCalculado;

                    // valor do novo limite não pode ser menor q zero
                    novoLimite = novoLimite < 0 ? 0 : novoLimite;

                    item.ValorCalculado = valorCalculado;
                    item.ReducaoVerificada = valorReducaoVerificaAplicada;
                    item.NovoLimite = novoLimite;
                }
            });

            if (restanteRestricao <= 0 ||
                proporcaoCortePorItem < 1) /* Se restar algum coisa por causa da casa decimal, mas já tiver sido rateado porporcional */
                return;
        });
    }

    calcularReducaoVerificada(valorAtual: number, valorFluxo: number) {
        return valorAtual * (valorFluxo / 100);
    }

    calcularUmValorNegativo() {
        let agrupamento = new AgrupamentoUtils()
        let fluxosOrdenadosParaCorte = agrupamento.agrupar(this.dataSource.data, 'UsinaConjuntoUsina.FluxoSaci.Valor');

        fluxosOrdenadosParaCorte.sort();

        let restanteRestricao: number = this.valorDaRestricao * -1;

        fluxosOrdenadosParaCorte.forEach(grupo => {
            let verificadoTotal = grupo.Itens.reduce((a, b) => a + b.obterValorPraCalcular(), 0);

            let potenciaTotal = grupo.Itens.reduce((a, b) => a + b.UsinaConjuntoUsina.PotenciaInstalada, 0);

            let reducaoVerificadaParaCalculo = this.calcularReducaoVerificada(potenciaTotal - verificadoTotal, Number(grupo.Nome)) ?? 0;

            let proporcaoPorItem = restanteRestricao >= reducaoVerificadaParaCalculo ? 1 : reducaoVerificadaParaCalculo == 0 ? 0 : (restanteRestricao / reducaoVerificadaParaCalculo);

            grupo.Itens.forEach((item: CalculoRestricaoDto) => {
                let valorParaCalculo = item.obterValorPraCalcular();

                let potenciaInstalada = (item.UsinaConjuntoUsina ? item.UsinaConjuntoUsina.PotenciaInstalada : 0)

                let valorCalculado = Math.round((potenciaInstalada - valorParaCalculo) * proporcaoPorItem);

                // valor do corte não pode ultrapassar a potencia instalada
                valorCalculado = valorCalculado > potenciaInstalada ? potenciaInstalada : valorCalculado;

                let novoLimite = valorParaCalculo + valorCalculado;

                // valor do novo limite não pode ser menor q zero
                novoLimite = novoLimite < 0 ? 0 : novoLimite;

                // valor do novo limite não pode ultrapassar a potencia instalada
                novoLimite = novoLimite > potenciaInstalada ? potenciaInstalada : novoLimite;

                // Descontar redução verificada da total a ser restrito
                let valorReducaoVerificaAplicada = this.calcularReducaoVerificada(valorCalculado, Number(grupo.Nome)) ?? 0;

                restanteRestricao -= valorReducaoVerificaAplicada;

                item.ValorCalculado = valorCalculado;
                item.NovoLimite = novoLimite;
                item.ReducaoVerificada = valorReducaoVerificaAplicada;
            });

            if (restanteRestricao <= 0 ||
                proporcaoPorItem < 1) /* Se restar algum coisa por causa da casa decimal, mas já tiver sido rateado prorporcional */
                return;
        });
    }
}
