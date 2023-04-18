import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsInputComponent } from './ons-input.component';

describe('OnsInputComponent', () => {
  let component: OnsInputComponent;
  let fixture: ComponentFixture<OnsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
