import { Component, HostBinding, OnInit } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { MatDialog } from '@angular/material/dialog';

import { ReleaseNotifierService, RouteMetaService } from 'ng-common';

import { AppSettingsService } from 'app/core/app-settings/app-settings.service';
import { UpdateService } from 'app/core/app-update/update.service';
import { appConfig } from './core/configs/app.config';
import { ThemingService } from './core/theming/theming.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private themingSubscription: Subscription;

  constructor (
    ccService: NgcCookieConsentService,
    private updateService: UpdateService,
    private appSettingsService: AppSettingsService,
    private releaseNotifierService: ReleaseNotifierService,
    private routeMetaService: RouteMetaService,
    private angulartics: Angulartics2GoogleGlobalSiteTag,
    private dialog: MatDialog,
    private themingService: ThemingService) { }

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

    this.themingSubscription = this.themingService.theme.subscribe(theme => this.applyTheme(theme));
  }

  public ngOnDestroy() {
    this.themingSubscription.unsubscribe();
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

  private applyTheme(theme: string) {
    const bodyClasses = document.body.classList;
      const themeClassesToRemove = Array.from(this.themingService.themes);
      if (themeClassesToRemove.length) {
        bodyClasses.remove(...themeClassesToRemove);
      }
      document.body.className = theme;
  }
}
