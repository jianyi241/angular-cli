import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierBillingComponent } from './supplier-billing.component';

describe('SupplierBillingComponent', () => {
  let component: SupplierBillingComponent;
  let fixture: ComponentFixture<SupplierBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
