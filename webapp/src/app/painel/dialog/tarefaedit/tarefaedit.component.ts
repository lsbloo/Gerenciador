import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '../../../../../node_modules/@angular/forms';
import { ApiService } from 'src/app/core/core/api.service';
import {Task} from '../../../core/core/models/Task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { PainelService } from '../../painel.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {SuccessComponent} from '../success/success.component';

@Component({
  selector: 'app-tarefaedit',
  templateUrl: './tarefaedit.component.html',
  styleUrls: ['./tarefaedit.component.css']
})
export class TarefaeditComponent implements OnInit {

  formEditTarefa: FormGroup
  datab: Object;

  constructor(public dialogRef: MatDialogRef<TarefaeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object,public dialog: MatDialog,private formBuilder: FormBuilder,private painelService: PainelService ,private apiService: ApiService, public router: Router) { 
    
    }

  
  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(): void {
    this.formEditTarefa = this.formBuilder.group({
      name:[''],
      description:[''],
    });
  }
  editTarefa(): void{
    let  name = this.formEditTarefa.value['name'];
    let description = this.formEditTarefa.value['description'];
    let result = this.painelService.getTarefaById(this.data['id_tarefa']);
    result.subscribe(datab=> {
      let conclusion = datab['conclusion']
      let calendar_id = datab['calendar_id']

      this.painelService.editTarefaById(this.data['id_tarefa'],
      new Task(calendar_id,name,description), conclusion);

      this.apiService.senderResponse.subscribe(response => {
        if(response === 'update_task'){
          const dialogRefSucess = this.dialog.open(SuccessComponent);
          dialogRefSucess.afterClosed().subscribe(result => {
            dialogRefSucess.close();
            this.dialogRef.close();
          });
        }
      })
  });
  }
}
