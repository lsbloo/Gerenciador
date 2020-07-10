import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '../../../../../node_modules/@angular/forms';
import { ApiService } from 'src/app/core/core/api.service';
import {Task} from '../../../core/core/models/Task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { PainelService } from '../../painel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tarefadd',
  templateUrl: './tarefadd.component.html',
  styleUrls: ['./tarefadd.component.css']
})
export class TarefaddComponent implements OnInit {

  formCreateTarefa: FormGroup
  constructor(public dialogRef: MatDialogRef<TarefaddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object,private formBuilder: FormBuilder,private painelService: PainelService ,private apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
  this.generateForm();
  }

  generateForm() {
    this.formCreateTarefa = this.formBuilder.group({
      name:[''],
      description:[''],
    });
  }

  createTarefa(): void {
    let name = this.formCreateTarefa.value['name']
    let description = this.formCreateTarefa.value['description']
    let task = new Task(this.data['id_calendar'],name,description);

    this.painelService.createTarefa(task);
    this.apiService.senderResponse.subscribe(response => {
      if(response === "created_tarefa"){
        alert('Tarefa criada com sucesso');
        this.router.navigate(['painel/tarefas']);
        this.dialogRef.close()
      }
    });
    this.apiService.senderBadRequest.subscribe(response => {
      if(response === 'bad_request'){
        alert('Não foi possivel criar esta tarefa.');
      }
    })
  }
}
