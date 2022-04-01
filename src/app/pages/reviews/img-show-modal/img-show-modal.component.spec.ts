import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgShowModalComponent } from './img-show-modal.component';

describe('ImgShowModalComponent', () => {
  let component: ImgShowModalComponent;
  let fixture: ComponentFixture<ImgShowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgShowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgShowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
