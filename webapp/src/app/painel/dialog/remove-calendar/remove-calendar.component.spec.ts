import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCalendarComponent } from './remove-calendar.component';

describe('RemoveCalendarComponent', () => {
  let component: RemoveCalendarComponent;
  let fixture: ComponentFixture<RemoveCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
