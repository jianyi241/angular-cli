import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeeComparisonComponent} from './fee-comparison.component';

describe('FeeComparisonComponent', () => {
  let component: FeeComparisonComponent;
  let fixture: ComponentFixture<FeeComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
