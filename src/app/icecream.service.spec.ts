import { TestBed } from '@angular/core/testing';

import { IcecreamService } from './icecream.service';

describe('IcecreamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IcecreamService = TestBed.get(IcecreamService);
    expect(service).toBeTruthy();
  });
});
