import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsSelectComponent } from './ons-select.component';

describe('OnsSelectComponent', () => {
  let component: OnsSelectComponent;
  let fixture: ComponentFixture<OnsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
