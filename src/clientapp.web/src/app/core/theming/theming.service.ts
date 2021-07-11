import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSettingsService } from '../app-settings/app-settings.service';

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

    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia(PrefersDarkModeQuery).matches;

    this.theme.next(this.getThemeClassName(prefersDarkMode));

    // Watch for changes of the preference
    window.matchMedia(PrefersDarkModeQuery).addEventListener('change', e => {
      const prefersDarkMode = e.matches;
      this.theme.next(this.getThemeClassName(prefersDarkMode));

      // Trigger refresh of UI
      this.ref.tick();
    });

    window.addEventListener('storage', (ev) => {
      //if (ev.key === 'settings:app') {
        console.log('settings changed');
      //}
    }, false);
  }

  private getThemeClassName(prefersDarkMode: boolean): ThemeClassName {
    const theme = this.appSettings.getAppSettings().theme;

    switch (theme) {
      case 'system': return prefersDarkMode ? 'dark-theme' : 'light-theme';
      case 'light': return 'light-theme';
      case 'dark': return 'dark-theme';
    }
  }
}
