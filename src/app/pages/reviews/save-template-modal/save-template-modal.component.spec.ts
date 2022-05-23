import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTemplateModalComponent } from './save-template-modal.component';

describe('SaveTemplateModalComponent', () => {
  let component: SaveTemplateModalComponent;
  let fixture: ComponentFixture<SaveTemplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTemplateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
