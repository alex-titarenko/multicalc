import { Component, HostBinding, OnInit } from '@angular/core';
import { CookieConsentService } from './core/cookie-consent/cookie-consent.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ReleaseNotifierService, RouteMetaService } from 'ng-common';

import { AppSettingsService } from 'app/core/app-settings/app-settings.service';
import { UpdateService } from 'app/core/app-update/update.service';
import { appConfig } from './core/configs/app.config';
import { ThemingService } from './core/theming/theming.service';
import { Subscription } from 'rxjs';
import { AnalyticsService } from './core/analytics/analytics.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private themingSubscription: Subscription;

  constructor (
    ccService: CookieConsentService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private updateService: UpdateService,
    private appSettingsService: AppSettingsService,
    private releaseNotifierService: ReleaseNotifierService,
    private routeMetaService: RouteMetaService,
    private analyticsService: AnalyticsService,
    private dialog: MatDialog,
    private themingService: ThemingService) {
      this.registerSvgIcons(matIconRegistry);
    }

  public ngOnInit() {
    this.routeMetaService.init({ brandName: appConfig.name });

    this.analyticsService.setUserProperties({
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

  private registerSvgIcons(matIconRegistry: MatIconRegistry): void {

    // get new icons here: https://fonts.google.com/icons?selected=Material+Icons
    const icons = [
      'add',
      'arrow_back',
      'backspace',
      'contact_support',
      'delete',
      'feedback',
      'format_list_bulleted',
      'get_app',
      'history',
      'info',
      'lock',
      'menu',
      'more_vert',
      'new_releases',
      'pan_tool',
      'people',
      'playlist_add_check',
      'settings',
      'share',
      'swap_vert',
      'tune',
      'view_module',
      'zoom_in'
    ];

    for (const icon of icons) {
      matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/icons/${icon}.svg`))
    }
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

    const themeColor = theme.startsWith('dark') ? '#383838' : 'white';
    this.applyThemeColor(themeColor);
  }

  private applyThemeColor(color: string) {
    // Theme color for Chrome, Firefox and Opera
    const themeColor = document.getElementById('themeColor') as HTMLMetaElement;
    themeColor.content = color;

    // Theme color for iOS
    document.body.style.backgroundColor = color;
  }
}
