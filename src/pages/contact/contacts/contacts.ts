import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AddContactPage} from '../../contactTabs/add-contact/add-contact'
import { AddGroupsPage } from '../../contactTabs/add-groups/add-groups';

/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }
  addGroup(){
    this.navCtrl.push(AddGroupsPage);
  }
  addContact(){
    this.navCtrl.push(AddContactPage);
  }

}
