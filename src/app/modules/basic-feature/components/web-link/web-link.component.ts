import { Component, OnInit } from '@angular/core';
import { BrowserService } from '../../../core/services/browser.service';
import { AppConfig } from '../../../../app.config';


@Component({
  selector: 'app-web-link',
  templateUrl: './web-link.component.html',
  styleUrls: ['./web-link.component.scss']
})
export class WebLinkComponent implements OnInit {

  webLinks = [
    {
      text: 'Baloo ',
      method: 'launchBaloo'
    },
    {
      text: 'Component Specs',
      method: 'launchCompSpec'
    },
    {
      text: 'Control Specs',
      method: 'launchControlSpec'
    },
    {
      text: 'Bitbucket',
      method: 'launchBitBucket'
    },
    {
      text: 'Git Compro Server Link',
      method: 'launchGitServer'
    }
  ];

  constructor(private browserService: BrowserService) { }

  ngOnInit() {
  }

  launchBaloo() {
    this.browserService.launchURL(AppConfig.urls.balooHomeUrl);
  }

  launchCompSpec() {
    this.browserService.launchURL(AppConfig.urls.compSpecUrl);
  }

  launchControlSpec() {
    this.browserService.launchURL(AppConfig.urls.controlSpecUrl);
  }

  launchBitBucket() {
    this.browserService.launchURL(AppConfig.urls.bitBucketUrl);
  }

  launchGitServer() {
    this.browserService.launchURL(AppConfig.urls.gitServerUrl);
  }
}
