import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceTeamComponent } from './advice-team.component';

describe('AdviceTeamComponent', () => {
  let component: AdviceTeamComponent;
  let fixture: ComponentFixture<AdviceTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviceTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
