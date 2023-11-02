import { Component, OnInit, Inject, ViewEncapsulation, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import tinycolor from 'tinycolor2';

interface ColorPickerDialogSettings {
  color: string;
}

@Component({
  selector: 'talex-color-picker-dialog',
  templateUrl: './color-picker-dialog.component.html',
  styleUrls: ['./color-picker-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorPickerDialogComponent implements OnInit {
  // Colors for the palette screen
  private readonly basePalette = [
    new tinycolor('rgb(255, 0, 0)'),		  // Red
    new tinycolor('rgb(255, 128, 0)'),		// Orange
    new tinycolor('rgb(255, 255, 0)'),		// Yellow
    new tinycolor('rgb(0, 255, 0)'),		  // Green
    new tinycolor('rgb(0, 255, 128)'),		//
    new tinycolor('rgb(0, 255, 255)'),		// Teal
    new tinycolor('rgb(0, 128, 255)'),		//
    new tinycolor('rgb(0, 0, 255)'),		  // Blue
    new tinycolor('rgb(128, 0, 255)'),		// Purple
    new tinycolor('rgb(255, 0, 255)')		  // Fusia
  ];

  // From white to black
  private readonly grays: string[] = [
    'rgb(255, 255, 255)',
    'rgb(205, 205, 205)',
    'rgb(178, 178, 178)',
    'rgb(153, 153, 153)',
    'rgb(127, 127, 127)',
    'rgb(102, 102, 102)',
    'rgb(76, 76, 76)',
    'rgb(51, 51, 51)',
    'rgb(25, 25, 25)',
    'rgb(0, 0, 0)'
  ];

  public colorChange = new EventEmitter<tinycolor.Instance>();

  public palette: string[][] = [];

  private _color = new tinycolor();
  public get color(): tinycolor.Instance { return this._color; }
  public set color(value: tinycolor.Instance) {
    this._color = value;
    this.colorChange.emit(value);
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: ColorPickerDialogSettings) {
    this.initPalette();

    this.color = new tinycolor(data.color);
  }

  public ngOnInit(): void { }

  public updateColor(color: string): void {
    this.color = new tinycolor(color);
  }

  public updateColorChannel(channel: string, value: number): void {
    if (channel !== '_a') {
      this.color[channel] = value;
    } else {
      this.color.setAlpha(value);
    }

    this.color = this.color.clone();
  }

  private initPalette(): void {
    this.palette = [];

    let colors = [];
    let x: number, y: number;
    for (x = -4; x <= 4; x++) {
      colors = [];
      for ( y = 0; y < this.basePalette.length; y++ ) {
        const newColor = new tinycolor(this.basePalette[y].toRgb());
        if ( x < 0 ) {
          colors.push(newColor.lighten(Math.abs( x * 10)).toRgbString() );
        }
        if ( x === 0 ) {
          colors.push(this.basePalette[y].toRgbString());
        }
        if ( x > 0 ) {
          colors.push( newColor.darken((x * ( x / 5 )) * 10).toRgbString() );
        }
      }
      this.palette.push(colors);
    }

    this.palette.push(this.grays);
  }
}
