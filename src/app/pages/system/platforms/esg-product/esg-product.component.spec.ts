import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsgProductComponent } from './esg-product.component';

describe('EsgProductComponent', () => {
  let component: EsgProductComponent;
  let fixture: ComponentFixture<EsgProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsgProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsgProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
