import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ErrorPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    ngOnInit(): void {
    }
  
    cancelDialog() {
      this.dialogRef.close({ message: 'cancel' });
    }
  
    acceptDialog() {
      this.dialogRef.close({ message: 'ok' });
    }

}
