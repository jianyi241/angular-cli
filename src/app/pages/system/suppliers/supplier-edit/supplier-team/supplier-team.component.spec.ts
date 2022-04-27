import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTeamComponent } from './supplier-team.component';

describe('SupplierTeamComponent', () => {
  let component: SupplierTeamComponent;
  let fixture: ComponentFixture<SupplierTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
