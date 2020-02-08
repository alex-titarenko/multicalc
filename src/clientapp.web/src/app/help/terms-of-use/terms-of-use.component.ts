import { Component, OnInit } from '@angular/core';
import { appConfig } from 'app/core/configs/app.config';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {
  public appName = appConfig.name;
  public licenser = appConfig.companyName;
  public appUrl: string = null;

  ngOnInit() {
    this.appUrl = window.location.host;
  }
}
