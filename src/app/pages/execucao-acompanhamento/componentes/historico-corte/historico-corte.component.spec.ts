import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoCorteComponent } from './historico-corte.component';

describe('HistoricoCorteComponent', () => {
  let component: HistoricoCorteComponent;
  let fixture: ComponentFixture<HistoricoCorteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoCorteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoCorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
