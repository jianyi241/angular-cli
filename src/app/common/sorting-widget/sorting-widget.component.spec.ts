import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingWidgetComponent } from './sorting-widget.component';

describe('SortingWidgetComponent', () => {
  let component: SortingWidgetComponent;
  let fixture: ComponentFixture<SortingWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
