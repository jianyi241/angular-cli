import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DueTipComponent} from './due-tip.component';

describe('SaveTemplateTipComponent', () => {
  let component: DueTipComponent;
  let fixture: ComponentFixture<DueTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
