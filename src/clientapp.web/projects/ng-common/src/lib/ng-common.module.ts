import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';

import { NumberInputDirective } from './number-input/number-input.directive';
import { FitTextDirective } from './fit-text/fit-text.directive';
import { ConfirmationMessageDialogComponent } from './message/message.service';
import { FitChildrenDirective } from './fit-children/fit-children.directive';
import { FitChildDirective } from './fit-child/fit-child.directive';
import { ClickableDirective } from './clickable/clickable.directive';

@NgModule({
    declarations: [
        NumberInputDirective,
        FitTextDirective,
        FitChildrenDirective,
        FitChildDirective,
        ClickableDirective,
        ConfirmationMessageDialogComponent,
    ],
    imports: [
        A11yModule,
        MatButtonModule,
    ],
    exports: [
        NumberInputDirective,
        FitTextDirective,
        FitChildrenDirective,
        FitChildDirective,
        ClickableDirective,
    ]
})
export class NgCommonModule { }
