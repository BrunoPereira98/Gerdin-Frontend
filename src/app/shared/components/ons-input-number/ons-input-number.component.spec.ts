import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsInputNumberComponent } from './ons-input-number.component';

describe('OnsInputNumberComponent', () => {
  let component: OnsInputNumberComponent;
  let fixture: ComponentFixture<OnsInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsInputNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
