import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoRestricoesComponent } from './calculo-restricoes.component';

describe('CalculoRestricoesComponent', () => {
  let component: CalculoRestricoesComponent;
  let fixture: ComponentFixture<CalculoRestricoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculoRestricoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculoRestricoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
