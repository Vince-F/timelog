import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsFilterViewComponent } from './reports-filter-view.component';

describe('ReportsFilterViewComponent', () => {
  let component: ReportsFilterViewComponent;
  let fixture: ComponentFixture<ReportsFilterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsFilterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsFilterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
