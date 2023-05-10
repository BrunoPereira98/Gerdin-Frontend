import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[maxLengthNumber]'
})
export class MaxLengthNumberDirective {

  @Input() maxLengthNumber = '';

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    const functionalKeys = ['Backspace', 'Delete', 'ArrowRight', 'ArrowLeft', 'End', 'Home', 'Tab'];

    if (functionalKeys.indexOf(event.key) !== -1) {
      return;
    }

    const keyValue = +event.key;
    if (isNaN(keyValue) || !(new RegExp('^[0-9]*$').test(event.key))) {
      event.preventDefault();
      return;
    }

    const nativeElement = this.el.nativeElement;

    const hasSelection =
      nativeElement.selectionStart !== nativeElement.selectionEnd &&
      nativeElement.selectionStart !== null;
    let newValue;
    if (hasSelection) {
      newValue = this.replaceSelection(nativeElement, event.key);
    } else {
      newValue = nativeElement.value + keyValue.toString();
    }

    if (newValue.length > this.maxLengthNumber) {
      event.preventDefault();
    }
  }

  private replaceSelection(input: any, key: any) {
    const inputValue = input.value;
    const start = input.selectionStart;
    const end = input.selectionEnd || input.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }
}
