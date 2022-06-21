import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCostChartsComponent } from './total-cost-charts.component';

describe('TotalCostChartsComponent', () => {
  let component: TotalCostChartsComponent;
  let fixture: ComponentFixture<TotalCostChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCostChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCostChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
