import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSectionEditComponent } from './information-section-edit.component';

describe('InformationSectionEditComponent', () => {
  let component: InformationSectionEditComponent;
  let fixture: ComponentFixture<InformationSectionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationSectionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationSectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
