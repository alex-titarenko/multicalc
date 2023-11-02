import { Component, OnInit } from '@angular/core';
import { appConfig } from 'app/core/configs/app.config';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  public appName = appConfig.name;

  ngOnInit() {
  }
}
