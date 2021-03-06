import { Component, OnInit ,Inject} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '../../../../../node_modules/@angular/forms';
import { ApiService } from 'src/app/core/core/api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {AgendaS} from '../../../painel/painel/tarefa/tarefa.component';
import { DatePipe } from '@angular/common';
import { Calendar } from 'src/app/core/core/models/Calendar';
import { PainelService } from '../../painel.service';
import {SuccessComponent} from '../success/success.component';
import {FailureComponent} from '../failure/failure.component';

@Component({
  selector: 'app-agendadd',
  templateUrl: './agendadd.component.html',
  styleUrls: ['./agendadd.component.css']
})
export class AgendaddComponent implements OnInit {


  formAgenda: FormGroup

  constructor(private formBuilder: FormBuilder
    , public dialogRef: MatDialogRef<AgendaddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgendaS, public dialog: MatDialog,private painelService: PainelService, private apiService: ApiService) { 
    
  }

  ngOnInit(): void {
   this.generateForm();
  }

  createAgenda() {
    let date = this.formAgenda.value['date'];
    let pipe = new DatePipe('en-US');
    let date_string = pipe.transform(date,'short');

    let date_inf = date_string.split(',')[0];
    
    let description = this.formAgenda.value['description'];
    
    this.painelService.createAgenda(new Calendar(date_inf,description));
    this.apiService.senderResponse.subscribe(data => {
      if(data === 'created_agenda'){
        const dialogRefSucess = this.dialog.open(SuccessComponent);
        dialogRefSucess.afterClosed().subscribe(result => {
          this.dialogRef.close();
        });
      }
    });
    this.apiService.senderBadRequest.subscribe(data => {
      if(data === 'bad_request'){
        const dialogRefFail = this.dialog.open(FailureComponent);
        dialogRefFail.afterClosed().subscribe(result => {
            this.dialogRef.close();
          });
      }
    })
  }

  generateForm(): void {
    this.formAgenda = this.formBuilder.group({
      date:[''],
      description:[''],

    });

  }
}
