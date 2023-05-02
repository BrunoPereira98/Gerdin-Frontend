import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'ons-calendar',
  templateUrl: './ons-calendar.component.html',
  styleUrls: ['./ons-calendar.component.scss'],
})
export class OnsCalendarComponent implements OnInit {
  @Input() label: string = '';
  @Input() minDate: any;
  @Input() maxDate: any;

  @Output() readonly dateChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDateChange(event: any): void {
    this.dateChange.emit(event);
  }
}
