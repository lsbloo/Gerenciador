
/**
 *  Serviço de conexão com api-service;
 * @author osvaldo.airon
 */
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators'
import { from } from 'rxjs';
import { THIS_EXPR, ArrayType } from '@angular/compiler/src/output/output_ast';
import { Task, TarefaList ,TarefasList} from './models/Task';
import { Calendar, CalendarList } from './models/Calendar';
import { Agenda } from 'src/app/painel/painel/tarefa/tarefa.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static readonly URL_HOST="/api/v1/";
  static readonly URL_CRUD_CALENDAR=ApiService.URL_HOST+"calendary";
  static readonly URL_CRUD_CALENDAR_ALL = ApiService.URL_CRUD_CALENDAR + "/all";

  senderResponse = new EventEmitter<string>();
  senderBadRequest = new EventEmitter<string>();
  senderDataCalendarList = new EventEmitter<CalendarList[]>();
  senderDataTaskList = new EventEmitter<TarefaList[]>();


  static readonly httpOption = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }


  constructor(private http: HttpClient, private router: Router) { }

  findTarefasByAgenda(id_calendar: number): Observable<TarefasList[]> {
    let url = ApiService.URL_CRUD_CALENDAR;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let  paramsx = new HttpParams();
    paramsx = paramsx.append('id', id_calendar.toString());
    console.log(id_calendar);

    let arrayListTask = new Array<TarefaList>();
    return this.http.get<TarefasList[]>(url,{headers: headers, params: paramsx});
      
  }
  findAllAgenda(): void {
    let url = ApiService.URL_CRUD_CALENDAR_ALL;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let arrayCalendarList = new Array<CalendarList>();

    this.http.get(url,{headers: headers, observe: 'response'}).subscribe(response =>
      {
        if(response.status === 202){
          if(Array.isArray(response.body)){
            for(let index = 0 ; index < response.body.length ; index ++){
              const element = response.body[index];
              arrayCalendarList.push(new CalendarList(element['date'],element['description'],element['id']))
            }
          }
          this.senderDataCalendarList.emit(arrayCalendarList);
        }

      }, () => {
        this.senderBadRequest.emit('bad_request');
      });
  }
  createAgenda(agenda: Calendar): void{
    let url = ApiService.URL_CRUD_CALENDAR;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(agenda.date);
    console.log(agenda.description);

    this.http.post(url,agenda,{headers: headers, observe: 'response'}).subscribe(response => {

      if(response.status === 202){
        this.senderResponse.emit('created_agenda');
      }
    }, () => {
      this.senderBadRequest.emit('bad_request');
    });
  }
}
