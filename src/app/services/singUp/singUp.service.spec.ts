import { TestBed } from '@angular/core/testing';

import { SingUpService } from './singUp.service';

describe('SingUpService', () => {
  let service: SingUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
