import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ColorPickerDialogComponent } from './color-picker-dialog/color-picker-dialog.component';

@Component({
  selector: 'talex-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  @Input()
  public placeholder: string;

  private _color: string;

  @Input()
  public get color() {
    return this._color;
  }

  public set color(value: string) {
    this._color = value;
    this.colorChange.emit(value);
  }

  @Output()
  public colorChange = new EventEmitter<string>();

  constructor (private dialog: MatDialog) {
  }

  public openColorPickerDialog() {
    const dialogRef = this.dialog.open(ColorPickerDialogComponent, {
      width: '300px',
      height: '336px',
      panelClass: 'color-picker-dialog',
      autoFocus: false,
      data: { color: this.color }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const newColor = <string>result;
        this.color = newColor;
      }
    });
  }
}
