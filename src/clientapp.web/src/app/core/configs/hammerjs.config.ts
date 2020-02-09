import { GestureConfig, HammerInstance } from '@angular/material/core';
import { Injectable } from "@angular/core";

@Injectable()
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
