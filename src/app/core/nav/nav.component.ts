import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AppInstallerService } from 'ng-common';
import { AnalyticsService } from '../analytics/analytics.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output()
  itemClick: EventEmitter<any> = new EventEmitter<any>();

  public modules: AppModule[];

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public appInstaller: AppInstallerService,
    private analyticsService: AnalyticsService) {
    this.modules = [
      { name: 'Calculator', icon: 'talex:calculator', routerLink: '/calculator' },
      { name: 'Unit Converter', icon: 'talex:unit', routerLink: '/unit-converter' },
      { name: 'Plot 2D', icon: 'talex:plot2d', routerLink: '/plot2d' }
    ];

    iconRegistry.addSvgIconSetInNamespace('talex', sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons.svg'));
  }

  ngOnInit() {
    this.appInstaller.appInstalled.subscribe(() => {
      this.analyticsService.trackEvent('app_install');
    });
  }

  onItemClick() {
    this.itemClick.emit(null);
  }
}

interface AppModule {
  name: string;
  icon: string;
  routerLink: string;
}
