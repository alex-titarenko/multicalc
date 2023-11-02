import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSettingsService, ThemeName } from '../app-settings/app-settings.service';

const PrefersDarkModeQuery = '(prefers-color-scheme: dark)';
type ThemeClassName = 'dark-theme' | 'light-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  public readonly themes: ReadonlyArray<ThemeClassName> = ['dark-theme', 'light-theme'];
  public readonly theme = new BehaviorSubject<ThemeClassName>('light-theme');

  constructor(private readonly appSettings: AppSettingsService) {
    // set current value
    this.setThemeClassName(this.appSettings.getAppSettings().theme, this.getPrefersDarkMode());

    // Watch for changes of the preference
    window.matchMedia(PrefersDarkModeQuery).addEventListener('change', e => {
      this.setThemeClassName(this.appSettings.getAppSettings().theme, e.matches);
    });

    // Watch for changes of the settings
    appSettings.settingsChanged.subscribe(appSettings => {
      this.setThemeClassName(appSettings.theme, this.getPrefersDarkMode());
    });
  }

  private getPrefersDarkMode = () =>
    window.matchMedia &&
    window.matchMedia(PrefersDarkModeQuery).matches;

  private setThemeClassName(themeName: ThemeName, prefersDarkMode: boolean): void {
    let theme: ThemeClassName = 'light-theme';

    switch (themeName) {
      case 'system': theme = prefersDarkMode ? 'dark-theme' : 'light-theme'; break;
      case 'light': theme = 'light-theme'; break;
      case 'dark': theme = 'dark-theme'; break;
    }

    this.theme.next(theme);
  }
}
