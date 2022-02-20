import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interface/heroes.interface';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styles: [
  ]
})
export class DialogConfirmComponent implements OnInit {

  constructor(private dialogRf: MatDialogRef<DialogConfirmComponent>,@Inject(MAT_DIALOG_DATA)public data : Heroe) { }

  ngOnInit(): void {
    
  }
    delete(){
      this.dialogRf.close(true);
    }
    close(){
      this.dialogRf.close();
    }
}
