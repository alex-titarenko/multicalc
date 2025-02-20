import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemingService } from '../../core/theming/theming.service';

import { Plot2DPreferences, defaultPreferences } from '../shared/plot2d-preferences.model';

@Component({
  selector: 'app-plot2d-preferences',
  templateUrl: './plot2d-preferences.component.html',
  styleUrls: ['./plot2d-preferences.component.scss']
})
export class Plot2DPreferencesComponent {
  constructor(
    public readonly themingService: ThemingService,
    public dialogRef: MatDialogRef<Plot2DPreferencesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plot2DPreferences) {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public reset(): void {
    this.data.axesColor = defaultPreferences.axesColor;
    this.data.backgroundColor = defaultPreferences.backgroundColor;
    this.data.foregroundColor = defaultPreferences.foregroundColor;
    this.data.gridlinesColor = defaultPreferences.gridlinesColor;
    this.data.axesColorDark = defaultPreferences.axesColorDark;
    this.data.backgroundColorDark = defaultPreferences.backgroundColorDark;
    this.data.foregroundColorDark = defaultPreferences.foregroundColorDark;
    this.data.gridlinesColorDark = defaultPreferences.gridlinesColorDark;
    this.data.gridlinesVisibility = defaultPreferences.gridlinesVisibility;
    this.data.axesVisibility = defaultPreferences.axesVisibility;
  }
}
