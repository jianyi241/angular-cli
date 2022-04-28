import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupplierUsersComponent } from './manage-supplier-users.component';

describe('ManageSupplierUsersComponent', () => {
  let component: ManageSupplierUsersComponent;
  let fixture: ComponentFixture<ManageSupplierUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSupplierUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSupplierUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
