import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpComponent } from './help.component';
import { AboutComponent } from './about/about.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ThirdPartyLicensesComponent } from './third-party-licenses/third-party-licenses.component';

import { appConfig } from 'app/core/configs/app.config';

const routes: Routes = [
  {
  path: 'help',
  component: HelpComponent,
  data: { title: 'Help', shouldReuse: false },
  children: [
    {
      path: '',
      redirectTo: 'about',
      pathMatch: 'full',
    },
    {
      path: 'about',
      component: AboutComponent,
      data:
      {
        title: 'About',
        description: `Information page about our Service, the ${ appConfig.name } Web App.`
      }
    },
    {
      path: 'terms',
      component: TermsOfUseComponent,
      data:
      {
        title: 'Terms of Use',
        description: `These Service Standard Terms and Conditions written on this page ` +
          `shall manage your use of our Service, ${ appConfig.name }`
      }
    },
    {
      path: 'privacy-policy',
      component: PrivacyPolicyComponent,
      data:
      {
        title: 'Privacy Policy',
        description: 'This page is used to inform you regarding our policies with the collection, use, ' +
          `and disclosure of Personal Information if anyone decided to use our Service, the ${ appConfig.name } Web App.`
      }
    },
    {
      path: 'third-party-licenses',
      component: ThirdPartyLicensesComponent,
      data:
      {
        title: 'Third Party Libraries',
        description: `The list of third-party libraries in use by our Service, the ${ appConfig.name } Web App.`
      }
    },
    {
      path: 'release-notes',
      component: ReleaseNotesComponent,
      data:
      {
        title: 'Release Notes',
        description: `Release notes for our Service, the ${ appConfig.name } Web App.`
      }
    }
  ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HelpRoutingModule {}
