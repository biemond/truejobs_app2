import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  versionNumber: string;

  constructor( private app: AppVersion,
               private iab: InAppBrowser,
               public platform: Platform,
               private ga: GoogleAnalytics) {
    platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.app.getVersionNumber().then(version => {
          this.versionNumber = version;
        });
      }
    });
  }

  ngOnInit() {
  }

  getVersionNumber() {
    return this.versionNumber;
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      this.ga.trackView('About Page');
      console.log('About Page enter');
    });
  }

  openPolicyLink(): void {
    const url = 'http://www.truejobsindia.com/2018/10/privacy-policy.html';
    console.log(url);
    this.platform.ready().then(() => {
        const browser = this.iab.create(url, '_system', 'location=true');
    });
  }

}
