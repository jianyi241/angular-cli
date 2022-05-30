import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReviewTipComponent} from './review-tip.component';

describe('SaveTemplateTipComponent', () => {
  let component: ReviewTipComponent;
  let fixture: ComponentFixture<ReviewTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
