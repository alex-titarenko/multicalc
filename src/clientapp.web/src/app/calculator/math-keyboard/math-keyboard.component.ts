import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { trigger, style, transition, animate, query, group } from '@angular/animations';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ExtendedInputComponent, ExtendedInput } from '../extended-input/extended-input.component';

export enum KeyboardMode {
  Full = 0,
  Compact = 1
}

enum AdditionalKeyboardState {
  Open = 'open',
  Close = 'close',
  DragOnOpen = 'dragOnOpen',
  DragOnClose = 'dragOnClose',
  FullOpen = 'fullOpen'
}

@Component({
  selector: 'app-math-keyboard',
  templateUrl: './math-keyboard.component.html',
  styleUrls: ['./math-keyboard.component.scss'],
  animations: [
    trigger('additionalKeyboard', [
      transition('close => open, dragOnOpen => open, dragOnClose => open', [
        group([
          query('.main-keyboard', [
            animate('0.2s ease-out', style({ opacity: '0' }))
          ]),
          query('.additional-keyboard', [
            animate('0.2s ease-out', style({ transform: 'translateX(0%)' }))
          ])
        ])
      ]),
      transition('open => close, dragOnOpen => close, dragOnClose => close', [
        group([
          query('.main-keyboard', [
            animate('0.2s ease-out', style({ opacity: '1' }))
          ]),
          query('.additional-keyboard', [
            animate('0.2s ease-out', style({ transform: 'translateX(100%)' }))
          ])
        ])
      ])
    ])
  ]
})
export class MathKeyboardComponent implements OnInit {
  private _keyboardMode: KeyboardMode = KeyboardMode.Full;

  public readonly extendedInputs = {
    zero: [
      { token: 'b', text: 'Binary number suffix'},
      { token: 'o', text: 'Octal number suffix' },
      { token: 'h', text: 'Hexadecimal number suffix' },
      { token: 'x', text: 'Expression variable' }
    ],
    decimal: [
      { token: ',', text: 'Matrix column or arguments separator' },
      { token: ';', text: 'Matrix row separator' }
    ]
  };

  public get keyboardMode() {
    return this._keyboardMode;
  }

  @Input()
  public set keyboardMode(mode: KeyboardMode) {
    this._keyboardMode = mode;

    if (mode === KeyboardMode.Compact) {
      this.additionalKeyboardState = AdditionalKeyboardState.Close;
    } else {
      this.additionalKeyboardState = AdditionalKeyboardState.FullOpen;
    }
  }

  @Output()
  public input = new EventEmitter<string>();

  @Output()
  public backspace = new EventEmitter();

  @Output()
  public clear = new EventEmitter();

  @Output()
  public evaluate = new EventEmitter();

  @Output()
  public insertFunction = new EventEmitter();

  public inverseOn: boolean = false;

  public hyperbolicOn: boolean = false;

  public additionalKeyboardState: AdditionalKeyboardState = AdditionalKeyboardState.Close;

  public additionalKeyboardOffset = 100;

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  public emitInsertFunction() {
    this.insertFunction.emit();
  }

  public emitInput(token: string, invToken?: string, hypToken?: string, invHypToken?: string) {
    const formattedToken = this.formatLabel(token, invToken, hypToken, invHypToken);
    this.input.emit(formattedToken);
  }

  public emitBackspace() {
    this.backspace.emit();
  }

  public emitClear() {
    this.clear.emit();
  }

  public emitEvaluate() {
    this.evaluate.emit();
  }

  public showExtendedInput(inputs: ExtendedInput[]) {
    const onContextMenuHandler = document.body.oncontextmenu;
    document.body.oncontextmenu = function () { return false; };

    const bottomSheetRef = this.bottomSheet.open(ExtendedInputComponent, {
      restoreFocus: false,
      data: inputs
    });

    bottomSheetRef.afterOpened().subscribe(() => {
      document.body.oncontextmenu = onContextMenuHandler;
    });

    bottomSheetRef.instance.input.subscribe((inputToken: string) => {
      this.emitInput(inputToken);
      bottomSheetRef.dismiss();
    });
  }

  public toggleInverse() {
    this.inverseOn = !this.inverseOn;
  }

  public toggleHyperbolic() {
    this.hyperbolicOn = !this.hyperbolicOn;
  }

  public formatLabel(defaultLabel: string, invLabel?: string, hypLabel?: string, invHypLabel?: string) {
    if (invHypLabel && this.inverseOn && this.hyperbolicOn) {
      return invHypLabel;
    } else if (invLabel && this.inverseOn) {
      return invLabel;
    } else if (hypLabel && this.hyperbolicOn) {
      return hypLabel;
    }

    return defaultLabel;
  }

  public onPanStart() {
    if (this.keyboardMode === KeyboardMode.Compact) {
      if (this.additionalKeyboardState === AdditionalKeyboardState.Open) {
        this.additionalKeyboardState = AdditionalKeyboardState.DragOnOpen;
      } else if (this.additionalKeyboardState === AdditionalKeyboardState.Close) {
        this.additionalKeyboardState = AdditionalKeyboardState.DragOnClose;
      }
    }
  }

  public onPanMove(offsetX: number) {
    if (this.keyboardMode === KeyboardMode.Compact) {
      const startOffset = this.additionalKeyboardState === AdditionalKeyboardState.DragOnClose ? 100 : 0;
      this.additionalKeyboardOffset = Math.max(0, Math.min(100, startOffset + offsetX));
    }
  }

  public onPanEnd(event: HammerInput) {
    if (this.keyboardMode === KeyboardMode.Compact) {
      if (this.isSwipeEvent(event)) {
        if (event.direction === 2) {
          this.openAdditionalKeyboard();
          return;
        } else if (event.direction === 4) {
          this.closeAdditionalKeyboard();
          return;
        }
      }

      if (this.additionalKeyboardState === AdditionalKeyboardState.DragOnClose) {
        if (this.additionalKeyboardOffset < 40) {
          this.additionalKeyboardState = AdditionalKeyboardState.Open;
        } else {
          this.additionalKeyboardState = AdditionalKeyboardState.Close;
        }
      } else if (this.additionalKeyboardState === AdditionalKeyboardState.DragOnOpen) {
        if (this.additionalKeyboardOffset > 60) {
          this.additionalKeyboardState = AdditionalKeyboardState.Close;
        } else {
          this.additionalKeyboardState = AdditionalKeyboardState.Open;
        }
      }
    }
  }

  public updateAdditionalKeyboardOffset() {
    if (this.additionalKeyboardState === AdditionalKeyboardState.Close) {
      this.additionalKeyboardOffset = 100;
    } else if (
      this.additionalKeyboardState === AdditionalKeyboardState.Open ||
      this.additionalKeyboardState === AdditionalKeyboardState.FullOpen) {
      this.additionalKeyboardOffset = 0;
    }
  }

  public openAdditionalKeyboard() {
    if (this.keyboardMode === KeyboardMode.Compact) {
      this.additionalKeyboardState = AdditionalKeyboardState.Open;
    }
  }

  public closeAdditionalKeyboard() {
    if (this.keyboardMode === KeyboardMode.Compact) {
      this.additionalKeyboardState = AdditionalKeyboardState.Close;
    }
  }

  private isSwipeEvent(event: HammerInput): boolean {
    return event.pointers.length === 1 && event.distance >= 10 && Math.abs(event.velocityX) >= 0.3;
  }
}
