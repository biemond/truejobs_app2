import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { GlobalVariable } from '../globals';
import { JobItemService } from '../services/job-item';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
})
export class ApplyPage implements OnInit {

  title: string;
  item: any;
  candidate: string;
  contact: string;
  altnumber: string;
  email: string;
  location: string;
  english: string;
  qualification: string;
  experience: string;
  skills: string;
  comment: string;
  allskills: boolean;

  contactForm: FormGroup;
  skillsForm: FormGroup;
  contactValidationError: boolean;
  skillValidationError: boolean;

  constructor(private jobItemService: JobItemService,
              public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              private http2: HTTP,
              public platform: Platform,
              private ga: GoogleAnalytics) {
    this.item = this.jobItemService.getItem();
    this.title = this.jobItemService.getTitle();

    this.contactForm = formBuilder.group({
      candidate: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      contact: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(15), Validators.required])],
      altnumber: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(15)])],
      email: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(80), Validators.email, Validators.required])],
      location: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(50), Validators.required])]
    });

    this.skillsForm = formBuilder.group({
      english: ['', Validators.compose([Validators.required])],
      qualification: ['', Validators.compose([Validators.required])],
      experience: ['', Validators.compose([Validators.required])],
      skills: ['', Validators.compose([Validators.required])],
      allskills: ['false', Validators.compose([Validators.required, Validators.requiredTrue])],
      comment: ['']
    });
  }

  send() {
    if (!this.contactForm.valid) {
      console.log('contact not valid!');
      this.contactValidationError = true;
    } else if (!this.skillsForm.valid) {
      console.log('skills not valid!');
      this.skillValidationError = true;
    } else {
      console.log('success!');
      this.skillValidationError = false;
      this.contactValidationError = false;

      const newline = '\n';
      let body = 'job title: ' + this.title + newline +
                 'location: ' + this.item.location.name + newline + newline;
      body += 'contact info: ' + newline;
      for (const field in this.contactForm.controls) { 
          const control = this.contactForm.get(field); 
          body += field + ': ' + control.value + newline;
      }
      body +=  newline + 'skills: ' + newline;
      for (const field in this.skillsForm.controls) { 
        const control = this.skillsForm.get(field); 
        body += field + ': ' + control.value + newline
      }

      let data = {
        'from': 'India TrueJobs <mailgun@' + GlobalVariable.MAIL_DOMAIN + '.mailgun.org>',
        'to': 'biemond@gmail.com,maan.truejobs@gmail.com,maan@truejobsindia.com',
        'subject': 'TrueJobs application ' + this.title,
        'text': body
      };

      let headers = {
      };

      this.http2.setDataSerializer('urlencoded');
      this.http2.useBasicAuth('api', GlobalVariable.MAIL_API);
      this.http2.post('https://api.mailgun.net/v3/' + GlobalVariable.MAIL_DOMAIN + '.mailgun.org/messages', data, headers)
      .then(data => {
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        this.success();
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        this.error();
      });
    }
  }

  async success() {
    const alert = await this.alertCtrl.create({
      header: 'Successful send the job application to TrueJobs',
      message: 'Everything went well',
      buttons: [
      {
        text: 'OK',
        handler: () => {
          console.log('Confirm Okay');
          this.navCtrl.navigateRoot('/home');
        }
      }
      ]
    });
    await alert.present();
  }

  async error() {
    const alert = await this.alertCtrl.create({
      header: 'Something went wrong',
      message: 'Please retry again',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          this.ga.trackView('Apply Job Page for ' + this.title);
          console.log('Apply Job Page enter');
    });
  }
}
