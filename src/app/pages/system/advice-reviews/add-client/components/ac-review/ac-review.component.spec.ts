import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcReviewComponent } from './ac-review.component';

describe('AcReviewComponent', () => {
  let component: AcReviewComponent;
  let fixture: ComponentFixture<AcReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
