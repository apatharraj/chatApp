import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGroupsPage } from './add-groups';

@NgModule({
  declarations: [
    AddGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGroupsPage),
  ],
  exports: [
    AddGroupsPage
  ]
})
export class AddGroupsPageModule {}
