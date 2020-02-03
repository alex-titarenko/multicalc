import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { FitBase } from '../shared/fit-base';

@Directive({
  selector: 'div[talexFitChild]',
  exportAs: 'FitChild'
})
export class FitChildDirective extends FitBase implements OnInit {
  @Input()
  public minScale: number = 0.5;

  @Input()
  public maxScale?: number = 1;

  @Input()
  public align: string = null;

  @Input()
  public customHandler: boolean = false;

  private get containerWidth() {
    let containerWidth = Number.parseFloat(getComputedStyle(this.element).width);

    if (this.align) {
      if (this.align.includes('right')) {
        containerWidth -= Number.parseFloat(getComputedStyle(this.element).paddingLeft);
      } else if (this.align.includes('left')) {
        containerWidth -= Number.parseFloat(getComputedStyle(this.element).paddingRight);
      }
    }

    return containerWidth;
  }

  private get containerHeight() {
    let containerHeight = Number.parseFloat(getComputedStyle(this.element).height);

    if (this.align) {
      if (this.align.includes('top')) {
        containerHeight -= Number.parseFloat(getComputedStyle(this.element).paddingBottom);
      } else if (this.align.includes('bottom')) {
        containerHeight -= Number.parseFloat(getComputedStyle(this.element).paddingTop);
      }
    }

    return containerHeight;
  }

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public ngOnInit() {
    const mutationObserver = new MutationObserver(() => {
      if (!this.customHandler) {
        this.resize();
      }
    });

    mutationObserver.observe(this.element, { childList: true });
  }

  public customResize() {
    this.resizeImpl();
  }

  protected isValidForResize(): boolean {
    return this.element.childElementCount === 1;
  }

  protected resize() {
    if (!this.customHandler) {
      super.resize();
    }
  }

  protected resizeImpl() {
    const child = <HTMLElement>this.element.firstElementChild;

    if (child) {
      const childWidth = Number.parseFloat(getComputedStyle(child).width);
      const childHeight = Number.parseFloat(getComputedStyle(child).height);

      let newScale = Math.min(this.containerWidth / childWidth, this.containerHeight / childHeight);

      if (this.maxScale !== null) {
        newScale = Math.min(newScale, this.maxScale);
      }

      if (newScale < this.minScale) {
        child.style.visibility = 'hidden';
      } else {
        child.style.visibility = 'visible';
      }

      if (this.align) {
        child.style.transformOrigin = this.align;
      }
      child.style.transform = `scale(${newScale})`;
    }
  }
}
