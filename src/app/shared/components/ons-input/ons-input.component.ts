import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIEL_VALUER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OnsInputComponent),
  multi: true,
};

/**
 * ONS-input
 * Atributos:
 *  required
 *  disabled
 *  label
 *  type
 *  typeIcon
 */
@Component({
  selector: 'ons-input',
  templateUrl: './ons-input.component.html',
  styleUrls: ['./ons-input.component.scss'],
  providers: [INPUT_FIEL_VALUER_ACCESSOR],
})
export class OnsInputComponent implements OnInit, ControlValueAccessor {
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() typeIcon: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() isReadOnly = false;
  @Input() placeholder: string = '';

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
}
