import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaeditComponent } from './tarefaedit.component';

describe('TarefaeditComponent', () => {
  let component: TarefaeditComponent;
  let fixture: ComponentFixture<TarefaeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
