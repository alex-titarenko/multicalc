import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'shared/material.module';
import { AppSettingsComponent } from './app-settings.component';
import { AppSettingsRoutingModule } from './app-settings-routing.module';

@NgModule({
  declarations: [
    AppSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AppSettingsRoutingModule
  ]
})
export class AppSettingsModule { }
