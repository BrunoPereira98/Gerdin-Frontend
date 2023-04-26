import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoPerfilComponent } from './selecao-perfil.component';

describe('SelecaoPerfilComponent', () => {
  let component: SelecaoPerfilComponent;
  let fixture: ComponentFixture<SelecaoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
