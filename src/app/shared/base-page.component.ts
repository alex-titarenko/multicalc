import { ElementRef, HostListener } from '@angular/core';

export class BasePageComponent {
  constructor(private elementRef: ElementRef = null) {
  }

  private menuToggle: Toggle;

  public setMenuToggle(menuToggle: Toggle) {
    this.menuToggle = menuToggle;
  }

  protected onKeyPress(event: KeyboardEvent) { }

  protected onKeyDown(event: KeyboardEvent) {  }

  public onMenuToggle() {
    this.menuToggle.toggle();
  }

  private isVisible(): boolean {
    if (this.elementRef == null) {
      return false;
    }
    return this.elementRef.nativeElement.offsetParent != null;
  }

  @HostListener('document:keypress', ['$event'])
  private onKeyPressHandler(event: KeyboardEvent) {
    if (this.isVisible()) {
      this.onKeyPress(event);
    }
  }

  @HostListener('document:keydown', ['$event'])
  private onKeyDownHandler(event: KeyboardEvent) {
    if (this.isVisible()) {
      this.onKeyDown(event);
    }
  }
}

export interface Toggle {
  toggle(): any;
}
