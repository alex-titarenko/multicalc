import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { AppInstallerService } from 'ng-common';
import { Angulartics2 } from 'angulartics2';

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
    private angulartics: Angulartics2) {
    this.modules = [
      { name: 'Calculator', icon: 'talex:calculator', routerLink: '/calculator' },
      { name: 'Unit Converter', icon: 'talex:unit', routerLink: '/unit-converter' },
      { name: 'Plot 2D', icon: 'talex:plot2d', routerLink: '/plot2d' }
    ];

    iconRegistry.addSvgIconSetInNamespace('talex', sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons.svg'));
  }

  ngOnInit() {
    this.appInstaller.appInstalled.subscribe(() => {
      this.angulartics.eventTrack.next({
         action: 'install_app',
         properties: {
          category: 'engagement'
         }
        });
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
