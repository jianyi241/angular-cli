import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DueHeaderComponent} from './due-header.component';

describe('ReviewHeaderComponent', () => {
  let component: DueHeaderComponent;
  let fixture: ComponentFixture<DueHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
