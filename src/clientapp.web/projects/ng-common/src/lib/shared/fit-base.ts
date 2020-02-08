import { ElementRef, HostListener } from '@angular/core';

export abstract class FitBase {
  private resizeTimer: NodeJS.Timer = null;

  protected get element(): HTMLElement {
    return <HTMLElement>this.elementRef.nativeElement;
  }

  constructor(private elementRef: ElementRef) { }

  private isElementVisible(): boolean {
    return this.element.offsetHeight * this.element.offsetWidth !== 0;
  }

  @HostListener('window:resize')
  protected resize() {
    if (this.isElementVisible()) {
      if (this.isValidForResize()) {
        this.resizeImpl();
      }
    } else if (this.resizeTimer == null) {
      this.resizeTimer = setInterval(() => {
        if (this.isElementVisible()) {
          clearInterval(this.resizeTimer);
          this.resizeTimer = null;
          this.resize();
        }
      }, 100);
    }
  }

  protected abstract resizeImpl(): void;

  protected isValidForResize(): boolean {
    return true;
  }
}
