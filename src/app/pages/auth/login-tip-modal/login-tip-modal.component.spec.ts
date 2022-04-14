import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTipModalComponent } from './login-tip-modal.component';

describe('LoginTipModalComponent', () => {
  let component: LoginTipModalComponent;
  let fixture: ComponentFixture<LoginTipModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTipModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
