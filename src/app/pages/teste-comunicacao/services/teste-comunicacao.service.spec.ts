import { TestBed } from '@angular/core/testing';

import { TesteComunicacaoService } from './teste-comunicacao.service';

describe('TesteComunicacaoService', () => {
  let service: TesteComunicacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesteComunicacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
