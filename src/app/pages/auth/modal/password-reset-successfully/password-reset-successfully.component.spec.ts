import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetSuccessfullyComponent } from './password-reset-successfully.component';

describe('PasswordResetSuccessfullyComponent', () => {
  let component: PasswordResetSuccessfullyComponent;
  let fixture: ComponentFixture<PasswordResetSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetSuccessfullyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
