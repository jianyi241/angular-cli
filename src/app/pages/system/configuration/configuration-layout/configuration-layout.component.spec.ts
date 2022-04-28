import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigurationLayoutComponent} from './configuration-layout.component';

describe('SupplierLayoutComponent', () => {
  let component: ConfigurationLayoutComponent;
  let fixture: ComponentFixture<ConfigurationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
