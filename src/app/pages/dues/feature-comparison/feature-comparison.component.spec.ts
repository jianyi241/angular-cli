import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeatureComparisonComponent} from './feature-comparison.component';

describe('FeatureComparisonComponent', () => {
  let component: FeatureComparisonComponent;
  let fixture: ComponentFixture<FeatureComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
