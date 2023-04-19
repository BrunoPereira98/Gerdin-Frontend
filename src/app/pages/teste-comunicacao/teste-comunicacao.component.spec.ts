import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteComunicacaoComponent } from './teste-comunicacao.component';

describe('TesteComunicacaoComponent', () => {
  let component: TesteComunicacaoComponent;
  let fixture: ComponentFixture<TesteComunicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteComunicacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteComunicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
