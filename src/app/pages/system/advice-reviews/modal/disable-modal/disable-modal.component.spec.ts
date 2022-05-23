import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableModalComponent } from './disable-modal.component';

describe('DisabledModalComponent', () => {
  let component: DisableModalComponent;
  let fixture: ComponentFixture<DisableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
