import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavigationMenuComponent } from './app-navigation-menu.component';

describe('AppNavigationMenuComponent', () => {
  let component: AppNavigationMenuComponent;
  let fixture: ComponentFixture<AppNavigationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNavigationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
