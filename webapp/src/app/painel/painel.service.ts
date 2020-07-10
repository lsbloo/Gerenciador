import { Injectable } from '@angular/core';
import { ApiService } from '../core/core/api.service';
import { Calendar } from '../core/core/models/Calendar';
import { Observable } from 'rxjs';
import { Agenda } from './painel/tarefa/tarefa.component';
import { TarefaList, TarefasList } from '../core/core/models/Task';


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
  getTarefasByAgenda(id_calendar: number): Observable<TarefasList[]>{
    return this.apiService.findTarefasByAgenda(id_calendar);
  }
}
