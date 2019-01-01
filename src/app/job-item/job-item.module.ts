import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JobItemPage } from './job-item.page';
import { PipesModule } from '../pipes.module';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';

const routes: Routes = [
  {
    path: '',
    component: JobItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    GoogleMaps
  ],
  declarations: [JobItemPage]
})
export class JobItemPageModule {}
