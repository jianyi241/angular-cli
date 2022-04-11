import {TestBed} from '@angular/core/testing';

import {FocusService} from './focus.service';

describe('FoucsService', () => {
  let service: FocusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FocusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
