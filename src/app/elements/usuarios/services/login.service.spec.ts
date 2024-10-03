import { TestBed } from '@angular/core/testing';

import { LoginUserService } from './login.service';

describe('LoginUserService', () => {
  let service: LoginUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
