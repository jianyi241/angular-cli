import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PropViewComponent} from './prop-view.component';

describe('PropViewComponent', () => {
  let component: PropViewComponent;
  let fixture: ComponentFixture<PropViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
