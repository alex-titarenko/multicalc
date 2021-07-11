import { Component, HostBinding, OnInit } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { MatDialog } from '@angular/material/dialog';

import { ReleaseNotifierService, RouteMetaService } from 'ng-common';

import { AppSettingsService } from 'app/core/app-settings/app-settings.service';
import { UpdateService } from 'app/core/app-update/update.service';
import { appConfig } from './core/configs/app.config';
import { ThemingService } from './core/theming/theming.service';
import { OverlayContainer } from '@angular/cdk/overlay';
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
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer) { }

  @HostBinding('class') public cssClass: string;

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

    this.themingSubscription = this.themingService.theme.subscribe(theme => {
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
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

  /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
   private applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }
}
