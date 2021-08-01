import { Component, ElementRef, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { SettingsService } from 'ng-common';

import { BasePageComponent } from 'shared/base-page.component';
import { removeLoader } from '../core/loader/loader.helper';
import { ThemingService } from '../core/theming/theming.service';
import { Trace2D } from './plot2d-canvas/trace2d.model';
import { Plot2DPreferencesComponent } from './plot2d-preferences/plot2d-preferences.component';
import { Plot2DPreferences, defaultPreferences } from './shared/plot2d-preferences.model';
import { TraceEditorComponent } from './trace-editor/trace-editor.component';
import { TraceListComponent } from './trace-list/trace-list.component';

@Component({
  selector: 'app-plot2d',
  templateUrl: './plot2d.component.html',
  styleUrls: ['./plot2d.component.scss']
  })
export class Plot2DComponent extends BasePageComponent implements OnInit {
  private static readonly settingsKey: string = 'plot2d';

  public preferences: Plot2DPreferences;

  public traces: Trace2D[] = [];
  public dragMode: string = 'HandTool';

  private readonly colorSeries: string[] = [
    'dodgerblue',
    'green',
    'orange',
    'purple',
    'lime',
    'magenta',
    'teal',
    'gold',
    'dimgray',
    'cyan',
    'navy',
    'maroon',
    'red',
    'olive',
    'silver',
    'lightsalmon',
    'black'
  ];

  constructor(
    elementRef: ElementRef,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private settingsService: SettingsService,
    public themingService: ThemingService) {
    super(elementRef);
  }

  public ngOnInit() {
    this.preferences = this.settingsService.get<Plot2DPreferences>(Plot2DComponent.settingsKey, defaultPreferences);

    removeLoader();
  }

  public addTrace(): void {
    const newColor = this.colorSeries[this.traces.length % this.colorSeries.length];

    const dialogRef = this.dialog.open(TraceEditorComponent, {
      autoFocus: true,
      data: null
    });

    dialogRef.componentInstance.data.color = newColor;

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const trace = <Trace2D>result;
        this.traces.push(trace);
      }
    });
  }

  public showTraces(): void {
    this.bottomSheet.open(TraceListComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: this.traces
    });
  }

  public openPreferences(): void {
    const dialogRef = this.dialog.open(Plot2DPreferencesComponent, {
      data: this.preferences
    });

    dialogRef.afterClosed().subscribe(() => {
      this.settingsService.set(Plot2DComponent.settingsKey, this.preferences);
    });
  }
}
