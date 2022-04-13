import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceInvoicesComponent } from './advice-invoices.component';

describe('AdviceInvoicesComponent', () => {
  let component: AdviceInvoicesComponent;
  let fixture: ComponentFixture<AdviceInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviceInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
