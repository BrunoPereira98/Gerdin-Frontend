import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[non-null-value]'
})
export class NonNullNumbersDirective {

  constructor(
    private element: ElementRef,
    private ngControl: NgControl
  ) { }

  get ctrl() {
    return this.ngControl.control;
  }

  @Input('value') nonNullValue: number | undefined;

  @HostListener('blur') onBlur() {
    if (this.nonNullValue === null) {
      this.element.nativeElement.value = 0;
      this.ctrl.setValue(0);
    }
  }
}
