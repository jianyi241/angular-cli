import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DueLayoutComponent} from './due-layout.component';

describe('ReviewLayoutComponent', () => {
  let component: DueLayoutComponent;
  let fixture: ComponentFixture<DueLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
