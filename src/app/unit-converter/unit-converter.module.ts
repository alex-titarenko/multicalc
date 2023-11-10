import { ClipboardMenuComponent } from './clipboard-menu.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'shared/material.module';
import { NgCommonModule } from 'ng-common';
import { NgModule } from '@angular/core';
import { UnitConverterComponent } from './unit-converter.component';

@NgModule({
  declarations: [
    UnitConverterComponent,
    ClipboardMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgCommonModule
  ]
})
export class UnitConverterModule { }
