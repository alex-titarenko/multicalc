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

  constructor(
    private readonly ref: ApplicationRef,
    private readonly appSettings: AppSettingsService) {

    const prefersDarkMode = this.getPrefersDarkMode();
    this.theme.next(this.getThemeClassName(this.appSettings.getAppSettings().theme, prefersDarkMode));

    // Watch for changes of the preference
    window.matchMedia(PrefersDarkModeQuery).addEventListener('change', e => {
      this.theme.next(this.getThemeClassName(this.appSettings.getAppSettings().theme, e.matches));

      // Trigger refresh of UI
      this.ref.tick();
    });

    appSettings.settingsChanged.subscribe(appSettings => {
      this.theme.next(this.getThemeClassName(appSettings.theme, this.getPrefersDarkMode()));

      // Trigger refresh of UI
      //this.ref.tick();
      console.log('settings changed');
    });
  }

  private getPrefersDarkMode = () =>
    window.matchMedia &&
    window.matchMedia(PrefersDarkModeQuery).matches;

  private getThemeClassName(themeName: ThemeName, prefersDarkMode: boolean): ThemeClassName {
    switch (themeName) {
      case 'system': return prefersDarkMode ? 'dark-theme' : 'light-theme';
      case 'light': return 'light-theme';
      case 'dark': return 'dark-theme';
    }
  }
}
