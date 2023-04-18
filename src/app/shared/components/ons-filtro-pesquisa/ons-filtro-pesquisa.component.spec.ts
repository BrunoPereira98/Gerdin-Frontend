import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsFiltroPesquisaComponent } from './ons-filtro-pesquisa.component';

describe('OnsFiltroPesquisaComponent', () => {
  let component: OnsFiltroPesquisaComponent;
  let fixture: ComponentFixture<OnsFiltroPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsFiltroPesquisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsFiltroPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
