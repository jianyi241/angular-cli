import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbdFeaturesComponent } from './pbd-features.component';

describe('PbdFeaturesComponent', () => {
  let component: PbdFeaturesComponent;
  let fixture: ComponentFixture<PbdFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbdFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbdFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
