import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTemplateTipComponent } from './save-template-tip.component';

describe('SaveTemplateTipComponent', () => {
  let component: SaveTemplateTipComponent;
  let fixture: ComponentFixture<SaveTemplateTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTemplateTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTemplateTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
