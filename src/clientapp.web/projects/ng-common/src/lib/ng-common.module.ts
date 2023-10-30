import { A11yModule } from '@angular/cdk/a11y';
import { ClickableDirective } from './clickable/clickable.directive';
import { ConfirmationMessageDialogComponent } from './message/message.service';
import { FitChildDirective } from './fit-child/fit-child.directive';
import { FitChildrenDirective } from './fit-children/fit-children.directive';
import { FitTextDirective } from './fit-text/fit-text.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { NumberInputDirective } from './number-input/number-input.directive';

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
        MatDialogModule,
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
