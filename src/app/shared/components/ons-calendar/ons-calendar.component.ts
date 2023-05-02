import { Component, Input, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_DATE_FIEL_VALUER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OnsCalendarComponent),
  multi: true,
};
@Component({
  selector: 'ons-calendar',
  templateUrl: './ons-calendar.component.html',
  styleUrls: ['./ons-calendar.component.scss'],
  providers: [INPUT_DATE_FIEL_VALUER_ACCESSOR],
})
export class OnsCalendarComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() isReadOnly = false;

  @Output() readonly dateChange = new EventEmitter();

  private innerValue: any;

  constructor() {}

  ngOnInit(): void {}

  onDateChange(event: any): void {
    this.dateChange.emit(event);
  }

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

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
}
