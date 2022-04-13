import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceBillingComponent } from './advice-billing.component';

describe('AdviceBillingComponent', () => {
  let component: AdviceBillingComponent;
  let fixture: ComponentFixture<AdviceBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviceBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
