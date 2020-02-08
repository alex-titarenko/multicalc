import { Component, OnInit, DoCheck, KeyValueDiffers } from '@angular/core';
import { BasePageComponent } from 'shared/base-page.component';
import { AppSettingsService, AppSettings } from 'app/core/app-settings/app-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent extends BasePageComponent implements OnInit, DoCheck {
  private settingsDiffer: any = null;
  public settings: AppSettings;

  constructor(
    private appSettingsService: AppSettingsService,
    private keyValueDiffers: KeyValueDiffers) {
    super(null);
  }

  ngOnInit() {
    this.settings = this.appSettingsService.getAppSettings();
    this.settingsDiffer = this.keyValueDiffers.find(this.settings).create();
  }

  ngDoCheck() {
    if (this.settingsDiffer != null) {
      const settingsChanges = this.settingsDiffer.diff(this.settings);

      if (settingsChanges) {
        this.appSettingsService.saveAppSettings(this.settings);
      }
    }
  }

  public reset(): void {
    this.settings = this.appSettingsService.getDefaultAppSettings();
  }
}
