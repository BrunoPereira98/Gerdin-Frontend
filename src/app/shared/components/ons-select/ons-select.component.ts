import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OperadorMatematico } from '../filtro/models/pperador-matematico';

const SELECT_VALUER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OnsSelectComponent),
  multi: true,
};
/**
 * ONS-Select
 * atributo selectItens tem que ser um array contendo um label e value, ex:
 * {
 *  "label": "Item 1",
 *  "value": "VALOR1"
 * },
 * {
 *  "label": "Item 2",
 *  "value": "VALOR2"
 * },
 */
@Component({
  selector: 'ons-select',
  templateUrl: './ons-select.component.html',
  styleUrls: ['./ons-select.component.scss'],
  providers: [SELECT_VALUER_ACCESSOR],
})
export class OnsSelectComponent implements OnInit, ControlValueAccessor {
  @Input() required: boolean = false;

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() labelObject: string = '';
  @Input() valueObject: any;
  @Input() selectItens: any[] = [];
  @Input() inputModel!: any;
  @Input() isReadOnly = false;
  @Input() disabled = false;

  @Output() selecionarItem = new EventEmitter();

  @Input() campoSalvar: string = '';

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  constructor() {}

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

  ngOnInit(): void {}

  inputModelChanges() {
    this.selecionarItem.emit();
  }

  ngOnDestroy() {
    if (this.campoSalvar) {
      if (this.value) {
        sessionStorage.setItem(this.campoSalvar, this.value ? JSON.stringify(this.value) : '');
      } else {
        sessionStorage.setItem(this.campoSalvar, JSON.stringify(OperadorMatematico.MAOI.Id.toString()));
      }
    }
  }

  carregarSalvos() {
    if (this.campoSalvar) {
      const salvo = sessionStorage.getItem(this.campoSalvar) ? sessionStorage.getItem(this.campoSalvar) : '';
      this.value = salvo ? JSON.parse(salvo) : OperadorMatematico.MAOI.Id.toString();
    }
  }
}
