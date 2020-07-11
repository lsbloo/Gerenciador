import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import { AgendaddComponent } from '../../dialog/agendadd/agendadd.component';
import {MatDialog} from '@angular/material/dialog';
import { TarefaddComponent } from '../../dialog/tarefadd/tarefadd.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PainelService } from '../../painel.service';
import { ApiService } from 'src/app/core/core/api.service';
import { Router } from '@angular/router';
import { TarefaeditComponent } from '../../dialog/tarefaedit/tarefaedit.component';
import { RemoveCalendarComponent } from '../../dialog/remove-calendar/remove-calendar.component';
import {SuccessComponent} from '../../dialog/success/success.component';
import { FailureComponent } from '../../dialog/failure/failure.component';

export interface AgendaS{
  data: string,
  description,
}
export class Agenda {
  data: string;
  titulo: string;
  id: number
  tarefaList: Tarefa[];

  constructor(id: number,data: string, titulo: string, tarefaList: Tarefa[]){
    this.data=data
    this.titulo=titulo
    this.tarefaList = tarefaList
    this.id=id
  }
}

export class Tarefa {
    name: string;
    description: string;
    conclusion: boolean;
    id: number
    
    constructor(name: string, description: string, conclusion: boolean, id: number){
      this.name=name
      this.description=description
      this.conclusion=conclusion
      this.id= id
    }
}

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  panelOpenState = false;
  checked = false;
  agenda = Array<Agenda>();

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  dataSource = new MatTableDataSource<Agenda>();
  constructor(public dialog: MatDialog,private painelService: PainelService, private apiService: ApiService, public router: Router) { }

  refreshData(): void {
    this.painelService.getAgendas();
    let arrayData = new Array<Agenda>();
    this.apiService.senderDataCalendarList.subscribe(data => {
      data.forEach(element => {
        let result = this.painelService.getTarefasByAgenda(element.id);
        result.subscribe(val => {
          if (val !== null){
            arrayData.push(new Agenda(element.id,element.date,element.description,val['tarefaList']))
          }else{
            arrayData.push(new Agenda(element.id,element.date,element.description,null));
          }
        });
      });
    });
    this.agenda = arrayData;
  }
  ngOnInit(): void {
    this.refreshData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgendaddComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }
  openDialogRemove(): void {
    const dialogRef = this.dialog.open(RemoveCalendarComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  openDialogAddTarefa(id_agenda: number) : void {
    this.panelOpenState = false;
    const dialogRef = this.dialog.open(TarefaddComponent,
      {data:{id_calendar: id_agenda}});
    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }

  removerTarefa(id_tarefa: number): void {
    this.painelService.deleteTarefa(id_tarefa);
    this.apiService.senderResponse.subscribe(data => {
      if(data ==='remove_task'){
        const dialogRefSucess = this.dialog.open(SuccessComponent);
        dialogRefSucess.afterClosed().subscribe(result => {
          dialogRefSucess.close();
          this.refreshData();
        });
      }
    });
    this.apiService.senderBadRequest.subscribe(data => {
      if(data === 'bad_request'){
        const dialogRefFailure = this.dialog.open(FailureComponent);
        dialogRefFailure.afterClosed().subscribe(result => {
          dialogRefFailure.close();
          this.refreshData();
        });
      }
    })
  }

  editarTarefa(id_tarefa: number): void {
   
    const dialogRef = this.dialog.open(TarefaeditComponent,
      {data: {id_tarefa: id_tarefa}});

    dialogRef.afterClosed().subscribe(result => {
      this.refreshData();
    });
  }
}
