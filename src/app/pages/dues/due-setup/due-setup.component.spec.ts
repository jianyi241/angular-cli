import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DueSetupComponent} from './due-setup.component';

describe('ComparisonSetupComponent', () => {
  let component: DueSetupComponent;
  let fixture: ComponentFixture<DueSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
