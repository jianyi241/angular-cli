import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeesRatesComponent} from './fees-rates.component';

describe('FeesRatesComponent', () => {
  let component: FeesRatesComponent;
  let fixture: ComponentFixture<FeesRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
