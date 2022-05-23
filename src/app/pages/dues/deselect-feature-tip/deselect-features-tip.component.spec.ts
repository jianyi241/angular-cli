import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeselectFeaturesTipComponent} from './deselect-features-tip.component';

describe('SaveTemplateTipComponent', () => {
  let component: DeselectFeaturesTipComponent;
  let fixture: ComponentFixture<DeselectFeaturesTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeselectFeaturesTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeselectFeaturesTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
