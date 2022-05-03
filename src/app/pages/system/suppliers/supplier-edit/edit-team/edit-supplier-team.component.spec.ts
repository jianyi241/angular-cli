import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditSupplierTeamComponent} from './edit-supplier-team.component';

describe('ManageSupplierUsersComponent', () => {
  let component: EditSupplierTeamComponent;
  let fixture: ComponentFixture<EditSupplierTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSupplierTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSupplierTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
