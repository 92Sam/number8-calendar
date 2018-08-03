import { TestBed, inject } from '@angular/core/testing';

import { CountrysService } from './countrys.service';

describe('CountrysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountrysService]
    });
  });

  it('should be created', inject([CountrysService], (service: CountrysService) => {
    expect(service).toBeTruthy();
  }));
});
