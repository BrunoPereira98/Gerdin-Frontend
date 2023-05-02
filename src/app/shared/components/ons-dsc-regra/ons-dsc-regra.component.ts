import { Component, Input } from '@angular/core';
import { IRegraMontada } from '../../../pages/regra/model/regra-montada';

@Component({
  selector: 'ons-dsc-regra',
  templateUrl: './ons-dsc-regra.component.html',
  styleUrls: ['./ons-dsc-regra.component.scss'],
})
export class OnsDscRegraComponent {
  @Input() data!: IRegraMontada;

  get labelVerdadeiro() {
    return this.data?.valorVerdadeiro.split(' ')[0];
  }

  get labelFalso() {
    return this.data?.valorFalso.split(' ')[0];
  }

  get valueVerdadeiro() {
    return this.data?.valorVerdadeiro.split(' ')[1];
  }

  get valueFalso() {
    return this.data?.valorFalso.split(' ')[1];
  }
}
