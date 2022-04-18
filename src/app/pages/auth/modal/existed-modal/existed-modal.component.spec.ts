import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistedModalComponent } from './existed-modal.component';

describe('ExistedModalComponent', () => {
  let component: ExistedModalComponent;
  let fixture: ComponentFixture<ExistedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
