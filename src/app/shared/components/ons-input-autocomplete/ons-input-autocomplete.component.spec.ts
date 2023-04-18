import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsInputAutocompleteComponent } from './ons-input-autocomplete.component';

describe('OnsInputAutocompleteComponent', () => {
  let component: OnsInputAutocompleteComponent;
  let fixture: ComponentFixture<OnsInputAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsInputAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsInputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
