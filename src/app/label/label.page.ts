import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { JobItemService } from '../services/job-item';
import { BloggerProvider } from '../services/blogger/blogger';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-label',
  templateUrl: './label.page.html',
  styleUrls: ['./label.page.scss'],
})
export class LabelPage implements OnInit {

  label: string;
  items: any;

  constructor(public route: ActivatedRoute,
              public navCtrl: NavController,
              public blogger: BloggerProvider,
              public jobItemService: JobItemService,
              public platform: Platform,
              private ga: GoogleAnalytics) {
    this.label = this.route.snapshot.paramMap.get('id');
    platform.ready().then(() => {
      this.refreshData(this.label);
    });
  }

  ngOnInit() {
  }

  itemTapped(item, title) {
    this.jobItemService.setItem(item);
    this.jobItemService.setTitle(title);
    this.navCtrl.navigateRoot('/job-item');
  }

  refreshData(label) {
    console.log('RefreshData for labels');
    this.blogger.getAllJobsByLabel(this.label).then(data => {
      this.items = data;
      // console.log(this.items);
    }, (err) => {
      console.log(err);
    });
  }
  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView('Label Page');
          console.log('Label Page enter');
    });
  }
}
