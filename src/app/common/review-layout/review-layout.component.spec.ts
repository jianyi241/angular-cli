import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLayoutComponent } from './review-layout.component';

describe('ReviewLayoutComponent', () => {
  let component: ReviewLayoutComponent;
  let fixture: ComponentFixture<ReviewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
