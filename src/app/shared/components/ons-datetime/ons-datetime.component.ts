import { Component, Input, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

const DATETIME_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OnsDatetimeComponent),
  multi: true,
};

@Component({
  selector: 'ons-datetime',
  templateUrl: './ons-datetime.component.html',
  styleUrls: ['./ons-datetime.component.scss'],
  providers: [DATETIME_VALUE_ACCESSOR],
})
export class OnsDatetimeComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() showSpinners: boolean = true;
  @Input() showSeconds: boolean = true;
  @Input() stepHour!: number;
  @Input() stepMinute!: number;
  @Input() stepSecond!: number;
  @Input() touchUi!: number;
  @Input() color!: ThemePalette;
  @Input() enableMeridian!: boolean;
  @Input() disableMinute!: boolean;
  @Input() hideTime!: boolean;
  @Input() myControl: FormControl = new FormControl();
  @Input() name: string = '';
  @Input() id: string = '';
  
  @Output() readonly dateChange = new EventEmitter();
  
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

  ngOnInit(): void {
  }

  onDateChange(event: any): void {
    this.dateChange.emit(event);
  }
}
