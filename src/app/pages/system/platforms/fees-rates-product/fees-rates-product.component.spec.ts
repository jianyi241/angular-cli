import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesRatesProductComponent } from './fees-rates-product.component';

describe('FeesRatesProductComponent', () => {
  let component: FeesRatesProductComponent;
  let fixture: ComponentFixture<FeesRatesProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesRatesProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesRatesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
