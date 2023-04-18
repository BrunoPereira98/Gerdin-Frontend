import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsCalendarComponent } from './ons-calendar.component';

describe('OnsCalendarComponent', () => {
  let component: OnsCalendarComponent;
  let fixture: ComponentFixture<OnsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
