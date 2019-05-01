import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelogCreateFormComponent } from './timelog-create-form.component';

describe('TimelogCreateFormComponent', () => {
  let component: TimelogCreateFormComponent;
  let fixture: ComponentFixture<TimelogCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelogCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelogCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
