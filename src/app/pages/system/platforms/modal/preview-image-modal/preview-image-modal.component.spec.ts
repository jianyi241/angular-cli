import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewImageModalComponent } from './preview-image-modal.component';

describe('PreviewImageModalComponent', () => {
  let component: PreviewImageModalComponent;
  let fixture: ComponentFixture<PreviewImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewImageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
