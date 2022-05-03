import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessMetricComparisonComponent } from './business-metric-comparison.component';

describe('BusinessMetricComparisonComponent', () => {
  let component: BusinessMetricComparisonComponent;
  let fixture: ComponentFixture<BusinessMetricComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessMetricComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessMetricComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
