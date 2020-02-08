import { Component, OnInit } from '@angular/core';
import { appConfig } from 'app/core/configs/app.config';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public readonly appName = appConfig.name;
  public readonly homepageUrl = appConfig.homepageLink;
  public readonly appVersion = appConfig.version;
  public readonly copyright = appConfig.copyright;

  public ngOnInit() {
  }
}
