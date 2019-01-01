import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { BloggerProvider } from '../services/blogger/blogger';
import { JobItemService } from '../services/job-item';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: any;

  constructor(public navCtrl: NavController,
              public blogger: BloggerProvider,
              public jobItemService: JobItemService,
              public platform: Platform,
              private ga: GoogleAnalytics ) {
    platform.ready().then(() => {
      this.refreshData();
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView('Home Page');
          console.log('Home Page enter');
    });
  }

  refreshData() {
    console.log('RefreshData');
    this.blogger.getAllJobs().then(data => {
      this.items = data;
    }, (err) => {
      console.log(err);
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.refreshData();
    setTimeout(() => {
      console.log('Async refresh operation has ended');
      refresher.target.complete();
    }, 2000);
  }

  itemTapped(item, title) {
    this.jobItemService.setItem(item);
    this.jobItemService.setTitle(title);
    this.navCtrl.navigateRoot('/job-item');
  }

  labelTapped(label) {
    const newLabel = label.replace(/\//g, '%2F');
    this.navCtrl.navigateRoot('/label/' + newLabel);
  }
}
