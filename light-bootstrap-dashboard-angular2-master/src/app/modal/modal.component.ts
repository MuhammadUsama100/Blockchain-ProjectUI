import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close({event:'Cancel'});
  }

  public dataVal : string = "QmTwN5sP3pBcJLn572Kvxjk386khTpxfP8MYWH3iwhKu98";

  update(){
    this.dataVal =  "QmTwN5sP3pBcJLn572Kvxjk386khTpxfP8MYWH3iwhKu98"
  }
  update1(){
    this.dataVal =  "QmXvMCeV4w3vr1ABzp9uaxjDpNQBpStmBG2PShrGKfdJbn"
  }
  update2(){
    this.dataVal =  "nft-3"
  }

  doAction(){
    this.dialogRef.close({event:"Action",data:this.dataVal});
  }

  
}