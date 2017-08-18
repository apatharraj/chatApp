import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the AddMobilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-mobile',
  templateUrl: 'add-mobile.html',
})
export class AddMobilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMobilePage');
  }
//   addMobile(){
//     alert("hai");
//     this.sms.send('8695781197','hai its working fine').then(data=>{
// console.log(data);
//     },error=>{
//       alert(error);
//       console.log(error);
//     })
//   }
}
