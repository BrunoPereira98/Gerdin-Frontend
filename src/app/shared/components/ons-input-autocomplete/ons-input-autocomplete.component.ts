import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Observable } from 'rxjs';

const INPUT_AUTOCOMPLETE_FIEL_VALUER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OnsInputAutocompleteComponent),
  multi: true,
};

@Component({
  selector: 'ons-input-autocomplete',
  templateUrl: './ons-input-autocomplete.component.html',
  styleUrls: ['./ons-input-autocomplete.component.scss'],
  providers: [INPUT_AUTOCOMPLETE_FIEL_VALUER_ACCESSOR],
})
export class OnsInputAutocompleteComponent implements ControlValueAccessor {
  @Input() placeHolder!: string;
  @Input() myControl: FormControl = new FormControl();
  @Input() label!: string;
  @Input() labelInput!: string;
  @Input() filteredOptions!: Observable<any>;
  @Input() isReadOnly = false;
  @Input() name!: string;
  @Input() id!: any;
  @Input() disabled = false;
  @Input() displayWith: any;
  @Input() isSelectItem = false;

  @Output() keyUp = new EventEmitter();
  @Output() keyDown = new EventEmitter();
  @Output() selectMetodo = new EventEmitter();
  @Output() selecDisplayFn = new EventEmitter();
  @Output() focus = new EventEmitter();

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

  onKeyUp(event: any) {
    this.keyUp.emit(event);
  }

  onKeyDown(event: any) {
    this.keyDown.emit(event);
  }

  onDisplayFn(item: any): string {
    return item && this.isSelectItem
      ? item
      : item && this.labelInput
      ? item[this.labelInput]
      : '';
  }

  onSelectMetodo(event: any) {
    this.selectMetodo.emit(event);
  }

  onFocus(event: any) {
    this.focus.emit(event);
  }
}
