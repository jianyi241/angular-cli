import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbdInformationComponent } from './pbd-information.component';

describe('PbdInformationComponent', () => {
  let component: PbdInformationComponent;
  let fixture: ComponentFixture<PbdInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbdInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PbdInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
