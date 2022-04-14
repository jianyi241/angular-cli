import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MetricComparisonComponent} from './metric-comparison.component';

describe('ComparisonStep3Component', () => {
  let component: MetricComparisonComponent;
  let fixture: ComponentFixture<MetricComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
