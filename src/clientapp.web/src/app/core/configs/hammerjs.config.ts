import { GestureConfig, HammerInstance } from '@angular/material';

export class CustomHammerConfig extends GestureConfig {
  overrides = {
    'tap': { 'threshold': 9 }
  };

  buildHammer(element: HTMLElement): HammerInstance {
    const hammer = super.buildHammer(element) as any;

    // tslint:disable-next-line:forin
    for (const eventName in this.overrides) {
      hammer.get(eventName).set(this.overrides[eventName]);
    }

    return hammer;
  }
}
