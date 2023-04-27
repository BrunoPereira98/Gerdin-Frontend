import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsInputAutocompleteChipListComponent } from './ons-input-autocomplete-chip-list.component';

describe('OnsInputAutocompleteChipListComponent', () => {
  let component: OnsInputAutocompleteChipListComponent;
  let fixture: ComponentFixture<OnsInputAutocompleteChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsInputAutocompleteChipListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsInputAutocompleteChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
