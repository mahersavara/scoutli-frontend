import { TestBed } from '@angular/core/testing';

import { Discovery } from './discovery';

describe('Discovery', () => {
  let service: Discovery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Discovery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
