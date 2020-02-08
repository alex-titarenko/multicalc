import { Component, OnInit } from '@angular/core';
import { PACKAGE_LICENSES } from './package-licenses';
import { MEDIA_LICENSES } from './media-licenses';

@Component({
  selector: 'app-third-party-licenses',
  templateUrl: './third-party-licenses.component.html',
  styleUrls: ['./third-party-licenses.component.scss']
})
export class ThirdPartyLicensesComponent implements OnInit {
  public packageLicenses = PACKAGE_LICENSES;
  public mediaLicenses = MEDIA_LICENSES;

  ngOnInit() { }
}
