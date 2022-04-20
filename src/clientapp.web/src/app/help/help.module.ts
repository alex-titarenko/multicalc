import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'shared/material.module';
import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ThirdPartyLicensesComponent } from './third-party-licenses/third-party-licenses.component';
import { AboutComponent } from './about/about.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FeedbackOptionsComponent } from './feedback-options/feedback-options.component';

@NgModule({
    declarations: [
        HelpComponent,
        TermsOfUseComponent,
        ThirdPartyLicensesComponent,
        AboutComponent,
        ReleaseNotesComponent,
        FeedbackOptionsComponent,
        PrivacyPolicyComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        HelpRoutingModule
    ]
})
export class HelpModule { }
