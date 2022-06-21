import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformFeeChartsComponent } from './platform-fee-charts.component';

describe('PlatformFeeChartsComponent', () => {
  let component: PlatformFeeChartsComponent;
  let fixture: ComponentFixture<PlatformFeeChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformFeeChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformFeeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
