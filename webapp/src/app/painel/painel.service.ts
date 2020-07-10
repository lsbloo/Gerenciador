import { Injectable } from '@angular/core';
import { ApiService } from '../core/core/api.service';
import { Calendar } from '../core/core/models/Calendar';


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
  getTarefasByAgenda(id_calendar: number): void{
    this.apiService.findTarefasByAgenda(id_calendar);
  }
}
