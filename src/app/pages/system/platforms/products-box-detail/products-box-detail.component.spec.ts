import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBoxDetailComponent } from './products-box-detail.component';

describe('ProductsBoxDetailComponent', () => {
  let component: ProductsBoxDetailComponent;
  let fixture: ComponentFixture<ProductsBoxDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsBoxDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBoxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
