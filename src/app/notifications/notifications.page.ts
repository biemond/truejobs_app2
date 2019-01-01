import { Component, OnInit, NgZone } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, Events } from '@ionic/angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

export class LabelNotifications {
  label: string;
  push: boolean;
  constructor(label: string, push: boolean) {
     this.label = label;
     this.push = push;
  }
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  labels: LabelNotifications[] = [];
  urlLabels: string = 'http://www.truejobsindia.com/feeds/posts/default/-/LabelToFilterBy?max-results=50&alt=json';
  subscription: boolean = false;

  constructor(
    private http2: HTTP,
    public platform: Platform,
    public events: Events,
    private zone: NgZone,
    private ga: GoogleAnalytics) {
      this.events.subscribe('updateScreen', () => {
        this.zone.run(() => {
          console.log('force update the screen');
        });
      });

    this.platform.ready().then(() => {

      if (this.platform.is('cordova')) {
        this.getAllLabels();
        window['plugins'].OneSignal.getPermissionSubscriptionState((status) => {
          console.log('hasPrompted: ' + status.permissionStatus.hasPrompted);
          console.log('status: ' + status.permissionStatus.status);
          console.log('subscribed: ' + status.subscriptionStatus.subscribed);
          this.subscription = status.subscriptionStatus.subscribed;
          console.log('userSubscriptionSetting: ' + status.subscriptionStatus.userSubscriptionSetting);
          console.log('pushToken: ' + status.subscriptionStatus.pushToken);
          console.log('userId: ' + status.subscriptionStatus.userId);
        });
      }
    });

  }

  ngOnInit() {
  }

  subscriptionEnabledClicked() {
    if ( this.subscription) {
      window['plugins'].OneSignal.setSubscription(true);
    } else {
      window['plugins'].OneSignal.setSubscription(false);
    }
  }

  getAllLabels() {
    console.log('getAllLabels');
    this.labels = [];
    let headers = { 'Accept': 'application/json' };
    this.http2.get(this.urlLabels, {}, headers)
      .then(data => {
        var labels = JSON.parse(data.data);
        labels = labels.feed.category;

        for (let label of labels) {
          this.labels.push(new LabelNotifications( label.term, false ));
        }
        window['plugins'].OneSignal.getTags((tags)=> {
          console.log('Tags Received: ' + JSON.stringify(tags));
          var userTags : JSON = JSON.parse(JSON.stringify(tags));
          for (let item of this.labels) {
            if ( userTags[item.label] != null ) {
              item.push = true;
            }
          }
          // refresh
          this.events.publish('updateScreen');
        });

        console.log(data.status);
        console.log(data.headers);
      }).catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }

  checkboxClicked(label: LabelNotifications) {
    console.log('CheckboxClicked for ' + label.label + ' value ' + label.push);
    if ( label.push) {
      window['plugins'].OneSignal.sendTag(label.label, 'notused');
    } else {
      window['plugins'].OneSignal.deleteTag(label.label);
    }
  }
  ionViewDidEnter() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      this.ga.trackView('Notifications Page');
      console.log('Notifications Page enter');
    });
  }
}
