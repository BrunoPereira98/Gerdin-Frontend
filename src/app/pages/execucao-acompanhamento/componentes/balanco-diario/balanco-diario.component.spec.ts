import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancoDiarioComponent } from './balanco-diario.component';

describe('BalancoDiarioComponent', () => {
  let component: BalancoDiarioComponent;
  let fixture: ComponentFixture<BalancoDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancoDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
