import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalImageListComponent } from './horizontal-image-list.component';

describe('HorizontalImageListComponent', () => {
  let component: HorizontalImageListComponent;
  let fixture: ComponentFixture<HorizontalImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
