import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMobilePage } from './add-mobile';

@NgModule({
  declarations: [
    AddMobilePage,
  ],
  imports: [
    IonicPageModule.forChild(AddMobilePage),
  ],
  exports: [
    AddMobilePage
  ]
})
export class AddMobilePageModule {}
