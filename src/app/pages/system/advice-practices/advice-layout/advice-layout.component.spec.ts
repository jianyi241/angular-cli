import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceLayoutComponent } from './advice-layout.component';

describe('AdviceLayoutComponent', () => {
  let component: AdviceLayoutComponent;
  let fixture: ComponentFixture<AdviceLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviceLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
