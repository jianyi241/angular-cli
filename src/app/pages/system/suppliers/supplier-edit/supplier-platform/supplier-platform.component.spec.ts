import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPlatformComponent } from './supplier-platform.component';

describe('SupplierPlatformComponent', () => {
  let component: SupplierPlatformComponent;
  let fixture: ComponentFixture<SupplierPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierPlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
