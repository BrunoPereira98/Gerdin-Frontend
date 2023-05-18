import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalizadorAgenteComponent } from './totalizador-agente.component';

describe('TotalizadorAgenteComponent', () => {
  let component: TotalizadorAgenteComponent;
  let fixture: ComponentFixture<TotalizadorAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalizadorAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalizadorAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
