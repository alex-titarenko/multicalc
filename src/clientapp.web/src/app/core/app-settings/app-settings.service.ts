import { Injectable } from '@angular/core';
import { SettingsService } from 'ng-common';

export type ThemeName = 'system' | 'light' | 'dark';

export interface AppSettings {
  showNewReleasesNotifications: boolean;
  theme: ThemeName;
}

const APP_SETTINGS_DEFAULTS: AppSettings = {
  showNewReleasesNotifications: true,
  theme: 'system'
};

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private static readonly GENERAL_SETTING_KEY = 'app';

  constructor(private settingsService: SettingsService) { }

  public getAppSettings(): AppSettings {
    return this.settingsService.get<AppSettings>(AppSettingsService.GENERAL_SETTING_KEY, APP_SETTINGS_DEFAULTS);
  }

  public getDefaultAppSettings(): AppSettings {
    return Object.assign({}, APP_SETTINGS_DEFAULTS);
  }

  public saveAppSettings(appSettings: AppSettings) {
    this.settingsService.set(AppSettingsService.GENERAL_SETTING_KEY, appSettings);
  }
}
