import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveTemplateTipModalComponent} from './save-template-tip-modal.component';

describe('SaveTemplateTipModalComponent', () => {
  let component: SaveTemplateTipModalComponent;
  let fixture: ComponentFixture<SaveTemplateTipModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTemplateTipModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTemplateTipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
