import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'labels-overview', loadChildren: './labels-overview/labels-overview.module#LabelsOverviewPageModule' },
  { path: 'job-item', loadChildren: './job-item/job-item.module#JobItemPageModule' },
  { path: 'label/:id', loadChildren: './label/label.module#LabelPageModule' },
  { path: 'apply', loadChildren: './apply/apply.module#ApplyPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
