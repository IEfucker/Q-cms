/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListStateService } from './list-state.service';

describe('ListStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListStateService]
    });
  });

  it('should ...', inject([ListStateService], (service: ListStateService) => {
    expect(service).toBeTruthy();
  }));
});
