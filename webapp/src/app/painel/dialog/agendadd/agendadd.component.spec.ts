import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaddComponent } from './agendadd.component';

describe('AgendaddComponent', () => {
  let component: AgendaddComponent;
  let fixture: ComponentFixture<AgendaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
