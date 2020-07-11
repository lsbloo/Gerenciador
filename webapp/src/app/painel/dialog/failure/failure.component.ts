import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent implements OnInit {

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<FailureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object, public router: Router) { 
    
    }

  ngOnInit(): void {
  }

  exit(): void {
    this.dialogRef.close();
  }
}
