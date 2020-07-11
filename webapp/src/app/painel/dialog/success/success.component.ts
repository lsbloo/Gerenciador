import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object, public router: Router) { 
    
    }

  ngOnInit(): void {
  }
  exit(): void{
    this.dialogRef.close();
  }
}
