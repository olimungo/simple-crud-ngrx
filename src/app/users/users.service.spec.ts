import { TestBed, inject } from '@angular/core/testing';

import { UsersEffects } from './users.effects';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersEffects]
    });
  });

  it('should be created', inject([UsersEffects], (service: UsersEffects) => {
    expect(service).toBeTruthy();
  }));
});
