import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeReviewComponent } from './fee-review.component';

describe('FeeReviewComponent', () => {
  let component: FeeReviewComponent;
  let fixture: ComponentFixture<FeeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
