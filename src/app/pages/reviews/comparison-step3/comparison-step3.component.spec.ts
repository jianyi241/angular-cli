import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonStep3Component } from './comparison-step3.component';

describe('ComparisonStep3Component', () => {
  let component: ComparisonStep3Component;
  let fixture: ComponentFixture<ComparisonStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonStep3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
