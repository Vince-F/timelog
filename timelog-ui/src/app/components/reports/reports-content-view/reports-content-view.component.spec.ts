import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsContentViewComponent } from './reports-content-view.component';

describe('ReportsContentViewComponent', () => {
  let component: ReportsContentViewComponent;
  let fixture: ComponentFixture<ReportsContentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
