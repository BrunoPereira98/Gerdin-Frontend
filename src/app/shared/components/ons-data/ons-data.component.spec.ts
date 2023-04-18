import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsDataComponent } from './ons-data.component';

describe('OnsDataComponent', () => {
  let component: OnsDataComponent;
  let fixture: ComponentFixture<OnsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
