import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalVariable } from './globals';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Select jobs based on Labels',
      url: '/labels-overview',
      icon: 'apps'
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'alarm'
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: 'at'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'body'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ga: GoogleAnalytics
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {

        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          if (jsonData.notification.payload.additionalData != null) {
            console.log('Here we access addtional data');
            if (jsonData.notification.payload.additionalData.openURL != null) {
              console.log('Here we access the openURL sent in the notification data');
            }
          }
        };

        window['plugins'].OneSignal
          .startInit(GlobalVariable.ONE_SIGNAL, GlobalVariable.PUSH_GOOGLE_ID)
          .inFocusDisplaying(window['plugins'].OneSignal.OSInFocusDisplayOption.Notification)
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();

        console.log('Google analytics is starting now');
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.ga.startTrackerWithId('UA-2832203-11', 5 ).then(() => {
           console.log('Google analytics is ready now');
           // GoogleAnalytics.debugMode();
           this.ga.setAllowIDFACollection(false);
           // Tracker is ready
           // You can now track pages or set additional information such as AppVersion or UserId
        }).catch(e => console.log('Error starting GoogleAnalytics', e));
      }
    });
  }
}
