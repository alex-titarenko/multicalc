import { Directive, ElementRef, EventEmitter, Input, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[talexClickable]',
})
export class ClickableDirective {
  private pressed = false;
  private elementPosition: DOMRect;
  private longPressTimeout: NodeJS.Timeout = null;

  protected get element(): HTMLElement {
    return <HTMLElement>this.elementRef.nativeElement;
  }

  @Input()
  public longPressDuration: number = 700;

  @Output()
  public elClick = new EventEmitter<any>();

  @Output()
  public elPress = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  private onInteractionStart(event: Event) {
    event.preventDefault();

    this.elementPosition = this.getElementPosition();
    this.pressed = true;

    this.longPressTimeout = setTimeout(() => {
      if (this.pressed) {
        this.elPress.emit();

        if (this.elPress.observers.length > 0) {
          this.pressed = false;
        }
      }
    }, this.longPressDuration);
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  private onInteractionEnd(event: Event) {
    const newElementPosition = this.getElementPosition();

    if (this.pressed && this.samePosition(this.elementPosition, newElementPosition)) {
      if (event instanceof MouseEvent) {
        if (event.button === 0) {
          this.elClick.emit();
        } else if (event.button === 2) {
          this.elPress.emit();
        }
      } else {
        this.elClick.emit();
      }

      this.pressed = false;

      clearTimeout(this.longPressTimeout);
    }
  }

  @HostListener('mouseleave', ['$event'])
  @HostListener('touchcancel', ['$event'])
  private onMouseLeave() {
    this.pressed = false;
  }

  @HostListener('touchmove', ['$event'])
  private onTouchMove(event: TouchEvent | any) {
    event.preventDefault();

    const touch = event.touches[0];

    const touchElement = document.elementFromPoint(touch.pageX, touch.pageY);
    if (this.element !== touchElement && !this.isDescendant(this.element, touchElement)) {
      this.pressed = false;
    }
  }

  @HostListener('contextmenu', ['$event'])
  private onContextMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  private getElementPosition(): DOMRect {
    return this.element.getBoundingClientRect() as DOMRect;
  }

  private samePosition(pos1: DOMRect, pos2: DOMRect): boolean {
    return pos1.x === pos2.x && pos2.y === pos2.y;
  }

  private isDescendant(parent: Node, child: Node) {
    let node = child.parentNode;
    while (node !== null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
  }
}
