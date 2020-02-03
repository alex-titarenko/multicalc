import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalculatorModule } from './calculator/calculator.module';
import { UnitConverterModule } from './unit-converter/unit-converter.module';
import { Plot2DModule } from './plot2d/plot2d.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { HelpModule } from './help/help.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from 'shared/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    CalculatorModule,
    UnitConverterModule,
    Plot2DModule,
    AppSettingsModule,
    HelpModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
