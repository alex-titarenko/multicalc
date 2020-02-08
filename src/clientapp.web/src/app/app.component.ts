import { Component, OnInit } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { MatDialog } from '@angular/material';

import { ReleaseNotifierService, RouteMetaService } from 'ng-common';

import { AppSettingsService } from 'app/core/app-settings/app-settings.service';
import { appConfig } from './core/configs/app.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (
    ccService: NgcCookieConsentService,
    private appSettingsService: AppSettingsService,
    private releaseNotifierService: ReleaseNotifierService,
    private routeMetaService: RouteMetaService,
    private angulartics: Angulartics2GoogleGlobalSiteTag,
    private dialog: MatDialog) { }

  public ngOnInit() {
    this.routeMetaService.init({ brandName: appConfig.name });
    this.angulartics.startTracking();
    this.angulartics.setUserProperties({
      'display_mode': this.getDisplayMode(),
      'app_name': appConfig.name,
      'app_version': appConfig.version
    });

    this.notifyNewRelease();
    this.setNoScrollForOpenedDialogs();
    this.setCloseDialogOnBack(this.dialog);
  }

  private notifyNewRelease(): void {
    const appSettings = this.appSettingsService.getAppSettings();

    if (appSettings.showNewReleasesNotifications) {
      this.releaseNotifierService.notify(appConfig.version, '/help/release-notes');
    }
  }

  private getDisplayMode(): string {
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const isSafariStandaloneMode = (<any>window.navigator).standalone === true;

    return (isStandaloneMode || isSafariStandaloneMode) ? 'standalone' : 'browser';
  }

  private setNoScrollForOpenedDialogs() {
    const noScrollClassName = 'noscroll';
    this.dialog.afterOpened.subscribe(x => document.body.classList.add(noScrollClassName));
    this.dialog.afterAllClosed.subscribe(x => document.body.classList.remove(noScrollClassName));
  }

  private setCloseDialogOnBack(dialog: MatDialog) {
    let isDialogClosed = false;

    dialog.afterOpened.subscribe(d => {
      history.pushState({ dialogId: d.id }, '', location.pathname);

      d.afterClosed().subscribe(() => {
        if (history.state.dialogId && history.state.dialogId === d.id) {
          isDialogClosed = true;
          history.back();
        }
      });
    });

    window.addEventListener('popstate', () => {
      if (isDialogClosed) {
        isDialogClosed = false;
        return;
      }

      if (dialog.openDialogs.length > 0) {
        const lastDialog = dialog.openDialogs[dialog.openDialogs.length - 1];
        lastDialog.close();
      }
    });
  }
}
