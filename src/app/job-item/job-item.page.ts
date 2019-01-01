import { Component, OnInit, NgZone } from '@angular/core';
import { JobItemService } from '../services/job-item';
import { NavController, Platform, Events } from '@ionic/angular';
import { BloggerProvider } from '../services/blogger/blogger';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.page.html',
  styleUrls: ['./job-item.page.scss'],
})
export class JobItemPage implements OnInit {

  selectedItem: any;
  title: string;
  content: string;
  map: GoogleMap;
  lat: number;
  lng: number;

  constructor(private jobItemService: JobItemService,
              public navCtrl: NavController,
              public blogger: BloggerProvider,
              public platform: Platform,
              public events: Events,
              private zone: NgZone,
              private ga: GoogleAnalytics) {
    let postid = this.jobItemService.getItem();
    this.title = this.jobItemService.getTitle();

    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });

    platform.ready().then(() => {
      this.refreshData(postid);
    });
  }


  refreshData(postid) {
    console.log('GetPost');
    this.blogger.getPostById(postid).then(data => {
      this.selectedItem = data;
      if (data['location'] != null) {
        this.lat = data['location']['lat'];
        this.lng = data['location']['lng'];
        console.log('got lat ' + this.lat);
        console.log('got lng ' + this.lng);
      }
      let tempContent: string = data['content'];
      if (tempContent.indexOf('&nbsp; &nbsp; &nbsp;') > 0) {
        this.content = tempContent.substring(0, tempContent.indexOf('&nbsp; &nbsp; &nbsp;'));
      } else {
        this.content = tempContent;
      }
      // refresh
      if  (this.platform.is('cordova')) {
        this.loadMap();
      }
      this.events.publish('updateScreen');
    }, (err) => {
      console.log(err);
    });
  }

  apply(title, item) {
    console.log('title:' + title);
    this.jobItemService.setItem(item);
    this.jobItemService.setTitle(title);
    this.navCtrl.navigateRoot('/apply');
  }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    // await this.platform.ready();
    // await this.loadMap();
  }

  loadMap() {
    if (this.lat != null) {
      console.log('loadmap');
      let mapOptions: GoogleMapOptions = {
        controls: {
          compass: true,
          myLocationButton: true,
          indoorPicker: true,
          zoom: true
        },
        camera: {
          target: {
            lat: this.lat,
            lng: this.lng
          },
          tilt: 30,
          zoom: 13,
          bearing: 50
        }
      };

      this.map = GoogleMaps.create('map', mapOptions);
      console.log('done');
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: this.title,
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.lat,
            lng: this.lng
          }
        }).then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              marker.showInfoWindow();
            });
        });
      }).catch((r) => {
        console.log('error maps: ' + JSON.stringify(r));
      });
    }
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      this.ga.trackView('JobItem Page for ' + this.title);
      console.log('JobItem Page enter');
    });
  }
}
