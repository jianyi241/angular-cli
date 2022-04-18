import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptInvitationModalComponent } from './accept-invitation-modal.component';

describe('AcceptInvitationModalComponent', () => {
  let component: AcceptInvitationModalComponent;
  let fixture: ComponentFixture<AcceptInvitationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptInvitationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptInvitationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
