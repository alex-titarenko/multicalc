import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

export interface ExtendedInput {
  token: string;
  text: string;
}

@Component({
  selector: 'app-extended-input',
  templateUrl: './extended-input.component.html',
  styleUrls: ['./extended-input.component.scss']
})
export class ExtendedInputComponent {
  @Output()
  public input = new EventEmitter<string>();

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public inputs: ExtendedInput[]) { }

  public emitInput(inputToken: string) {
    this.input.emit(inputToken);
  }
}
