import { TestBed } from '@angular/core/testing';

import { HttpResultInterceptor } from './http-result.interceptor';

describe('HttpResultInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpResultInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpResultInterceptor = TestBed.inject(HttpResultInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
