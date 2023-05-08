import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_NUMBER_FIEL_VALUER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OnsInputNumberComponent),
  multi: true,
};
@Component({
  selector: 'ons-input-number',
  templateUrl: './ons-input-number.component.html',
  styleUrls: ['./ons-input-number.component.scss'],
  providers: [INPUT_NUMBER_FIEL_VALUER_ACCESSOR],
})
export class OnsInputNumberComponent implements OnInit, ControlValueAccessor {
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() typeIcon: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() isReadOnly = false;
  @Input() isCasasDecimais = false;
  @Input() separador = ',';
  @Input() maxLength!: number;
  @Input() campoSalvar!: string;
  @Input() permiteNegativos!: boolean;

  @Output() inputModelChange = new EventEmitter<string>();

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

  ngOnDestroy() {
    if (this.campoSalvar) {
      sessionStorage.setItem(this.campoSalvar, this.value ? this.value : '');
    }
  }

  carregarSalvos() {
    if (this.campoSalvar) {
      const salvo = sessionStorage.getItem(this.campoSalvar) ? sessionStorage.getItem(this.campoSalvar) : '';
      this.value = salvo;
    }
  }
}
