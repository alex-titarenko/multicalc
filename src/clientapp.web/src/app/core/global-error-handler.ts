import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private injector: Injector) {
    super();
  }

  handleError(error: any): void {
    super.handleError(error);

    const angulartics2 = this.injector.get(Angulartics2);

    if (angulartics2) {
      const exception = {
        fatal: true,
        description: error.stack
      };
      angulartics2.exceptionTrack.next(exception);
    }
  }
}
