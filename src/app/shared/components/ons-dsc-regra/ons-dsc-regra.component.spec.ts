import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsDscRegraComponent } from './ons-dsc-regra.component';

describe('OnsDscRegraComponent', () => {
  let component: OnsDscRegraComponent;
  let fixture: ComponentFixture<OnsDscRegraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsDscRegraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsDscRegraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
