import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTherapistComponent } from './approve-therapist.component';

describe('ApproveTherapistComponent', () => {
  let component: ApproveTherapistComponent;
  let fixture: ComponentFixture<ApproveTherapistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTherapistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTherapistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
