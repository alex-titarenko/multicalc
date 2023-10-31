import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[talexFitText]'
})
export class FitTextDirective {
  private static targetElements: any[] = [];

  @Input()
  public maxFontSize?: number;

  private resizeTimer: NodeJS.Timeout = null;

  constructor(element: ElementRef) {
    FitTextDirective.targetElements.push(element.nativeElement);

    const mutationObserver = new MutationObserver(() => {
      this.fontResize();
    });

    mutationObserver.observe(element.nativeElement, { characterData: true, subtree: true });
  }

  private static getElementWidth(element: Element) {
    return parseFloat(getComputedStyle(element)['width']);
  }

  private static getElementHeight(element: Element) {
    return parseFloat(getComputedStyle(element)['height']);
  }

  private static setFontSize(element: any, value: number) {
    element.style.fontSize = value + 'px';
  }

  private static isElementVisible(element: any): boolean {
    return element.offsetHeight * element.offsetWidth !== 0;
  }

  @HostListener('window:resize')
  private fontResize() {
    const targetElements = FitTextDirective.targetElements;

    if (targetElements.length > 0 && FitTextDirective.isElementVisible(targetElements[0])) {
      targetElements.forEach(element => {
        FitTextDirective.setFontSize(element, 1);
      });

      targetElements.forEach(element => {
        const minElementWidth = FitTextDirective.getElementWidth(element);
        const minElementHeight = FitTextDirective.getElementHeight(element);

        FitTextDirective.setFontSize(element, minElementHeight);

        const fitWidth = FitTextDirective.getElementWidth(element);
        let newFontSize = Math.floor(minElementHeight * (minElementWidth / fitWidth));

        if (this.maxFontSize != null) {
          newFontSize = Math.min(newFontSize, this.maxFontSize);
        }

        FitTextDirective.setFontSize(element, newFontSize);
      });
    } else if (targetElements.length > 0 && this.resizeTimer == null) {
      this.resizeTimer = setInterval(() => {
        if (FitTextDirective.isElementVisible(targetElements[0])) {
          clearInterval(this.resizeTimer);
          this.resizeTimer = null;
          this.fontResize();
        }
      }, 100);
    }
  }
}
