import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbdEsgComponent } from './pbd-esg.component';

describe('PbdEsgComponent', () => {
  let component: PbdEsgComponent;
  let fixture: ComponentFixture<PbdEsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbdEsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbdEsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
