import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbdFeesRatesComponent } from './pbd-fees-rates.component';

describe('PbdFeesRatesComponent', () => {
  let component: PbdFeesRatesComponent;
  let fixture: ComponentFixture<PbdFeesRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbdFeesRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbdFeesRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
