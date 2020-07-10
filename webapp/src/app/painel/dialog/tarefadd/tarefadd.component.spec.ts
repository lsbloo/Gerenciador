import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaddComponent } from './tarefadd.component';

describe('TarefaddComponent', () => {
  let component: TarefaddComponent;
  let fixture: ComponentFixture<TarefaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
