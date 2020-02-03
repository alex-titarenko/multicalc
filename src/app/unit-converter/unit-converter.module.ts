import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'shared/material.module';
import { NgCommonModule } from 'ng-common';
import { UnitConverterComponent } from './unit-converter.component';

@NgModule({
  declarations: [
    UnitConverterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgCommonModule
  ]
})
export class UnitConverterModule { }
