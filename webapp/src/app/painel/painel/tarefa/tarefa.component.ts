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

export interface AgendaS{
  data: string,
  description,
}
export class Agenda {
  data: string;
  titulo: string;
  tarefaList: Tarefa[];

  constructor(data: string, titulo: string, tarefaList: Tarefa[]){
    this.data=data
    this.titulo=titulo
    this.tarefaList = tarefaList
  }
}

export class Tarefa {
    name: string;
    description: string;
    conclusion: boolean;
    
    constructor(name: string, description: string, conclusion: boolean){
      this.name=name
      this.description=description
      this.conclusion=conclusion
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
  constructor(public dialog: MatDialog,private painelService: PainelService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.painelService.getAgendas();
    let arrayData = new Array<Agenda>();

    this.apiService.senderDataCalendarList.subscribe(data => {
      data.forEach(element => {
        let result = this.painelService.getTarefasByAgenda(element.id);
        result.subscribe(val => {
          if (val !== null){
            arrayData.push(new Agenda(element.date,element.description,val['tarefaList']))
          }
        });
      });
    });
    this.agenda = arrayData;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AgendaddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('q');
    });
  }

  openDialogAddTarefa() : void {
    console.log('add tarefa');

    const dialogRef = this.dialog.open(TarefaddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('f');
    });
  }

}
