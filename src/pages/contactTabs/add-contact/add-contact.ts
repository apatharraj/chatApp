import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { DbServiceProvider } from '../../../providers/db-service/db-service';
// import { an, FIREBASE_PROVIDERS } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the AddContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {
  public users: FirebaseListObservable<any>;
  public item: any[] = [];
  public avatar: any = "assets/images/male-avatar.png";
  public uid=localStorage.getItem('uid');
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {;
    this.users = this.db.list('/Users');
    this.item.push(this.users);
    console.log(this.users)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

}
