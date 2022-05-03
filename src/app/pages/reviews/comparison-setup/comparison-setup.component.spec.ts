import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonSetupComponent } from './comparison-setup.component';

describe('ComparisonSetupComponent', () => {
  let component: ComparisonSetupComponent;
  let fixture: ComponentFixture<ComparisonSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
