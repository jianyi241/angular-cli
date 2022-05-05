import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ComparisonsListComponent} from './comparisons-list.component';

describe('ComparisonsListComponent', () => {
  let component: ComparisonsListComponent;
  let fixture: ComponentFixture<ComparisonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
