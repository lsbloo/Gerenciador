import { Injectable } from '@angular/core';
import { ApiService } from '../core/core/api.service';
import { Calendar } from '../core/core/models/Calendar';
import { Observable } from 'rxjs';
import { Agenda } from './painel/tarefa/tarefa.component';
import { TarefaList, TarefasList, Task } from '../core/core/models/Task';


@Injectable({
  providedIn: 'root'
})
export class PainelService {

  constructor(private apiService: ApiService) { }


  getAgendas(): void {
    this.apiService.findAllAgenda();
  }

  createAgenda(agenda: Calendar){
    this.apiService.createAgenda(agenda);
  }
  createTarefa(task: Task){
    this.apiService.createTask(task);
  };
  getTarefasByAgenda(id_calendar: number): Observable<TarefasList[]>{
    return this.apiService.findTarefasByAgenda(id_calendar);
  }

  deleteTarefa(id_tarefa: number): void {
    this.apiService.removeTask(id_tarefa);
  }

  getTarefaById(id_tarefa): Observable<TarefaList> {
    return this.apiService.findTarefaById(id_tarefa);
  }


  editTarefaById(id_tarefa: number, task: Task, conclusion: boolean): void {
    this.apiService.editTarefa(id_tarefa,task, conclusion);
  }
}
