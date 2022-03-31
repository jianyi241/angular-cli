import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHistoryProductComponent } from './change-history-product.component';

describe('ChangeHistoryProductComponent', () => {
  let component: ChangeHistoryProductComponent;
  let fixture: ComponentFixture<ChangeHistoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeHistoryProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeHistoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
