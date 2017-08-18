import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileVerifyPage } from './mobile-verify';

@NgModule({
  declarations: [
    MobileVerifyPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileVerifyPage),
  ],
  exports: [
    MobileVerifyPage
  ]
})
export class MobileVerifyPageModule {}
