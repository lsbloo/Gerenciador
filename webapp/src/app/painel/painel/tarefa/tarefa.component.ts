import { Component, OnInit } from '@angular/core';
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
export interface Agenda {
  data: string;
  titulo: string;
  tarefaList: Tarefa[];
}

export interface Tarefa {
    name: string;
    description: string;
    conclusion: boolean;
}

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {
  
  panelOpenState = false;
  checked = false;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  dataSource = new MatTableDataSource<Agenda>();
  constructor(public dialog: MatDialog,private painelService: PainelService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.painelService.getAgendas();
    this.apiService.senderDataCalendarList.subscribe(data => {
      data.forEach(element => {
        this.painelService.getTarefasByAgenda(element.id);
      });
    })
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
