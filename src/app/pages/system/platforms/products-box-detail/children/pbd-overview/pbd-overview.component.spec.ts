import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbdOverviewComponent } from './pbd-overview.component';

describe('PbdOverviewComponent', () => {
  let component: PbdOverviewComponent;
  let fixture: ComponentFixture<PbdOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbdOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbdOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
