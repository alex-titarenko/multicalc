import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSettingsComponent } from './app-settings.component';
import { appConfig } from 'app/core/configs/app.config';

const routes: Routes = [
  {
    path: 'settings',
    component: AppSettingsComponent,
    data:
    {
      title: 'Settings',
      description: `User preferences for our Service, the ${ appConfig.name } Web App.`,
      shouldReuse: false,
      noIndex: true
    }
  }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class AppSettingsRoutingModule {}
