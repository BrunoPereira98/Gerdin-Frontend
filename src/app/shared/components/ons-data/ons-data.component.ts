import { Component, Input } from '@angular/core';

/**
 * @description
 * Componente para dados personalizados no ONS
 * select ng-contet header, body, center, footer e actions
 */
@Component({
  selector: 'ons-data',
  templateUrl: './ons-data.component.html',
  styleUrls: ['./ons-data.component.scss'],
})
export class OnsDataComponent<T> {
  @Input() identity!: number;
  constructor() {}
}
