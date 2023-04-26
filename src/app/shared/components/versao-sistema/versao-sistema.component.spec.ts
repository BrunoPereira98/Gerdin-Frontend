import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaoSistemaComponent } from './versao-sistema.component';

describe('VersaoSistemaComponent', () => {
  let component: VersaoSistemaComponent;
  let fixture: ComponentFixture<VersaoSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersaoSistemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersaoSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
