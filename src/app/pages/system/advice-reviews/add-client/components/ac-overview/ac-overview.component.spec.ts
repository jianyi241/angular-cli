import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcOverviewComponent } from './ac-overview.component';

describe('AcOverviewComponent', () => {
  let component: AcOverviewComponent;
  let fixture: ComponentFixture<AcOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
