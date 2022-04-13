import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceOverviewComponent } from './advice-overview.component';

describe('AdviceOverviewComponent', () => {
  let component: AdviceOverviewComponent;
  let fixture: ComponentFixture<AdviceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviceOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
