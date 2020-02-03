import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';

import { FitBase } from '../shared/fit-base';

@Directive({
  selector: '[talexFitChildren]'
})
export class FitChildrenDirective extends FitBase {
  @Input()
  public minFontSize ?: number;

  @Input()
  public maxFontSize?: number;

  @Input()
  public scrollIntoSelector?: string;

  @Output()
  public resizeComplete: EventEmitter<any> = new EventEmitter<any>();

  constructor(elementRef: ElementRef) {
    super(elementRef);

    const mutationObserver = new MutationObserver(() => {
      this.resize();

      if (this.scrollIntoSelector) {
        const targetEl = this.element.querySelector(this.scrollIntoSelector);
        if (targetEl) {
          targetEl.scrollIntoView();
        }
      }
    });

    mutationObserver.observe(this.element, { childList: true });
  }

  private static getElementWidth(element: Element): number {
    return parseFloat(getComputedStyle(element)['width']);
  }

  protected resizeImpl() {
    const currentFontSize = parseFloat(getComputedStyle(this.element).fontSize);
    const containerWidth = this.getContainerWidth();
    const childrenTotalWidth = this.getChildrenTotalWidth();

    let newFontSize = Math.floor(containerWidth / childrenTotalWidth * currentFontSize);

    if (this.minFontSize !== null) {
      newFontSize = Math.max(newFontSize, this.minFontSize);
    }

    if (this.maxFontSize !== null) {
      newFontSize = Math.min(newFontSize, this.maxFontSize);
    }

    this.setFontSize(newFontSize);

    this.resizeComplete.emit();
  }

  private getContainerWidth(): number {
    return FitChildrenDirective.getElementWidth(this.element);
  }

  private getChildrenTotalWidth(): number {
    let totalWidth = 0;

    for (let i = 0; i < this.element.children.length; i++) {
      totalWidth += FitChildrenDirective.getElementWidth(this.element.children.item(i));
    }
    return totalWidth;
  }

  private setFontSize(value: number) {
    this.element.style.fontSize = value + 'px';
  }
}
