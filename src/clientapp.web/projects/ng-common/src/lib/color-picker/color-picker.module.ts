import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';

import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerDialogComponent } from './color-picker-dialog/color-picker-dialog.component';

@NgModule({
    declarations: [
        ColorPickerComponent,
        ColorPickerDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatSliderModule,
        MatButtonModule,
        MatDialogModule,
        MatTabsModule
    ],
    exports: [
        ColorPickerComponent,
        ColorPickerDialogComponent
    ]
})
export class ColorPickerModule { }
