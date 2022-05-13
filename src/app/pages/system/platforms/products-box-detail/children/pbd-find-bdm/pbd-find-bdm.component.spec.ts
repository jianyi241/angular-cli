import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbdFindBdmComponent } from './pbd-find-bdm.component';

describe('PbdFindBdmComponent', () => {
  let component: PbdFindBdmComponent;
  let fixture: ComponentFixture<PbdFindBdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbdFindBdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbdFindBdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
