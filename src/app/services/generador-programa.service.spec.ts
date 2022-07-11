import { TestBed } from '@angular/core/testing';

import { GeneradorProgramaService } from './generador-programa.service';

describe('GeneradorProgramaService', () => {
  let service: GeneradorProgramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneradorProgramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
