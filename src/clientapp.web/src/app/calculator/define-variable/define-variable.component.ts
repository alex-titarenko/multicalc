import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-define-variable',
  templateUrl: './define-variable.component.html',
  styleUrls: ['./define-variable.component.scss']
})
export class DefineVariableComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DefineVariableComponent>) { }

  ngOnInit() { }

  public onSubmit(f: NgForm): void {
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
