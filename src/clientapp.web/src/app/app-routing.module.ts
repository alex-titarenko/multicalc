import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { CalculatorComponent } from './calculator/calculator.component';
import { UnitConverterComponent } from './unit-converter/unit-converter.component';
import { Plot2DComponent } from './plot2d/plot2d.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  {
    path: 'calculator',
    component: CalculatorComponent,
    data:
    {
      title: 'Calculator',
      description: 'A powerful, lightweight complex system for mathematical calculations, ' +
        'which brings to you the opportunity to solve your problems, as fast as possible. ' +
        'More than 160 built-in functions from different areas of math, ' +
        'full support of complex numbers and matrix calculations (even complex matrix calculations). ' +
        'The system itself contains a wide range of numerical methods, ' +
        'such as numeric integration, finding roots, solving linear systems and much more.'
    }
  },
  {
    path: 'unit-converter',
    component: UnitConverterComponent,
    data:
    {
      title: 'Unit Converter',
      description: 'A powerful unit converter with a vast amount of supported measurements ' +
        '(length, weight, volume, area, speed, time, temperature, energy, power, pressure, angle, data).'
    }
  },
  {
    path: 'plot2d',
    component: Plot2DComponent,
    data:
    {
      title: 'Plot 2D',
      description: 'An interactive plot for drawing functions (traces) in Cartesian coordinates. ' +
        'You can add as many traces as you want to the plot. ' +
        'You can change color, thickness, and boundaries for an individual trace.'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data:
    {
      title: 'Page not Found',
      description: 'The requested URL can not be found or might be temporarily unavailable.',
      noIndex: true
    }
  }];

@NgModule({
  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    MatButtonModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
