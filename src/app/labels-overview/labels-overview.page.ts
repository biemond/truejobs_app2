import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-labels-overview',
  templateUrl: './labels-overview.page.html',
  styleUrls: ['./labels-overview.page.scss'],
})
export class LabelsOverviewPage implements OnInit {

  labels: any;
  urlLabels: string = 'http://www.truejobsindia.com/feeds/posts/default/-/LabelToFilterBy?max-results=50&alt=json';

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private http2: HTTP,
    private ga: GoogleAnalytics) {
      platform.ready().then(() => {
        this.getAllLabels();
      });
  }

  labelTapped(label) {
    const newLabel = label.replace(/\//g, '%2F');
    this.navCtrl.navigateRoot('/label/' + newLabel);
  }

  getAllLabels() {
    console.log('getAllLabels');
    const headers = { 'Accept': 'application/json'};
    this.http2.get(this.urlLabels , {}, {})
     .then(data => {
        this.labels = JSON.parse(data.data);
        this.labels = this.labels.feed.category;
        }).catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
        });
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView('Labels overview Page');
          console.log('Labels overview Page enter');
    });
  }
}
