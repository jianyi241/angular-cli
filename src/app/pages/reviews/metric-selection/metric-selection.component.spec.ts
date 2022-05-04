import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MetricSelectionComponent} from './metric-selection.component';

describe('BusinessMetricComparisonComponent', () => {
  let component: MetricSelectionComponent;
  let fixture: ComponentFixture<MetricSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
