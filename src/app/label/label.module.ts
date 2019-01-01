import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LabelPage } from './label.page';
import { PipesModule } from '../pipes.module';

const routes: Routes = [
  {
    path: '',
    component: LabelPage
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
  ],
  declarations: [LabelPage]
})
export class LabelPageModule {}
