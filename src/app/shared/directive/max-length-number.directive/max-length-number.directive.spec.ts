import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaxLengthNumberDirective } from './max-length-number.directive';

@Component({
  template: `
  <input maxLengthNumber="5" type="number"/>
  `
})
class TestComponent { }

// Não tem configurado corretamente bibliotecas de test 🙁
describe('MaxLengthNumberDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let items: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [MaxLengthNumberDirective, TestComponent]
    })
      .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    items = fixture.debugElement.queryAll(By.directive(MaxLengthNumberDirective));
  });

  it('should have {} MaxLengthNumberDirective elements', () => {
    expect(items.length).toBe(1);
  });

  it('sdsds', () => {
    const event = new KeyboardEvent("keypress", {
      "key": "1"
    });
    items[0].nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(items[0].nativeElement.value).toBe("1");
  });
});