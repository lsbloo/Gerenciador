import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '../../../../../node_modules/@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { Router } from '@angular/router';
import {ApiService} from '../../../core/core/api.service';
import {PainelService} from '../../painel.service';
import { DatePipe } from '@angular/common';
import { SuccessComponent } from '../success/success.component';
import { FailureComponent } from '../failure/failure.component';

@Component({
  selector: 'app-remove-calendar',
  templateUrl: './remove-calendar.component.html',
  styleUrls: ['./remove-calendar.component.css']
})
export class RemoveCalendarComponent implements OnInit {

  formDeletaAgenda: FormGroup

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<RemoveCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object,private formBuilder: FormBuilder,private painelService: PainelService ,private apiService: ApiService, public router: Router) { 
    
    }

  ngOnInit(): void {
    this.generateForm();

  }

  deletarAgenda(): void {
    let date = this.formDeletaAgenda.value['date']
    let pipe = new DatePipe('en-US');
    let date_string = pipe.transform(date,'short');

    let date_inf = date_string.split(',')[0];
    console.log(date_inf);

    this.painelService.deleteAgenda(date_inf);
    this.apiService.senderResponse.subscribe(response => {
      if(response === 'calendary_deleted'){
        const dialogRefSucess = this.dialog.open(SuccessComponent);
        dialogRefSucess.afterClosed().subscribe(result => {
          this.dialogRef.close();
        });
      }
    })
    this.apiService.senderBadRequest.subscribe(response => {
      const dialogRefFail = this.dialog.open(FailureComponent);
      dialogRefFail.afterClosed().subscribe(result => {
          this.dialogRef.close();
        });
    });
  }
 
  generateForm(): void {
    this.formDeletaAgenda = this.formBuilder.group({
      date:['']
    });
  }
}
