import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { TabsPage } from '../../tabs/tabs';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public bgImage: any = "assets/images/profile-bg.jpg";
  public avatar: any = "assets/images/male-avatar.png";
  public gender: number;
  public myDate: string;
  public alert;
  public source;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private camera: Camera) {
    this.gender = 0;
  }

  ionViewDidLoad() {
    this.todayDate(this.myDate);
  }
  todayDate(datetoDay: string): void {
    let utc = new Date().toJSON().slice(0, 10);
    if (datetoDay === undefined) {
      this.myDate = utc;
    }
  }
  addProfileInfo(name, mobile, gender, dob) {
    console.log(name, mobile, gender, dob.year);
    if (name === "" && mobile === "" && gender === "" && dob === "") {
      this.alert = this.alertCtrl.create({
        subTitle: 'Must Enter All Fields',
        buttons: ['OK']
      })
      this.alert.present();
    }
    else if (name === "") {
      this.alert = this.alertCtrl.create({
        subTitle: 'Must Enter Name',
        buttons: ['OK']
      })
      this.alert.present();
    } else if (mobile === "") {
      this.alert = this.alertCtrl.create({
        subTitle: 'Must Enter Mobile Number',
        buttons: ['OK']
      })
      this.alert.present();
    }
    else if (mobile.length > 10) {
      this.alert = this.alertCtrl.create({
        subTitle: 'Enter Valid Mobile Number',
        buttons: ['OK']
      })
      this.alert.present();
    }
    else if (mobile.length < 10) {
      this.alert = this.alertCtrl.create({
        subTitle: 'Enter Valid Mobile Number',
        buttons: ['OK']
      })
      this.alert.present();
    }
    else if (dob.year > 2000) {
      this.alert = this.alertCtrl.create({
        subTitle: 'Please Select your Correct Date of Birth !!!',
        buttons: ['OK']
      })
      this.alert.present();
    }
    else {
      let gernderData: string;
      if (this.gender == 0) {
        gernderData = "Male";
      } else {
        gernderData = "Female";
      }
      firebase.database().ref('/Users').child(firebase.auth().currentUser.uid).update({
        Name: name,
        Mobile: mobile, Gender: gernderData,
        DOB: dob
      });
      this.navCtrl.push(TabsPage);
    }
  }
  profileImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Profile Picture',
      cssClass: 'profile-action',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          cssClass: 'camera-access',
          handler: () => {
            console.log('Camera clicked');
            this.setProfile(0);
          }
        }, {
          icon: 'images',
          text: 'Gallery',
          handler: () => {
            console.log('Gallery clicked');
            this.setProfile(1);
          }
        }

      ]
    });
    actionSheet.present();
  }
  setProfile(type) {
    if (type === 0) {
      this.source = this.camera.PictureSourceType.CAMERA
    } else if (type === 1) {
      this.source = this.camera.PictureSourceType.PHOTOLIBRARY
    }
    console.log(type);
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.source,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.avatar = base64Image;
      this.bgImage = base64Image;
      firebase.database().ref('/Users').child(firebase.auth().currentUser.uid).update({
        Profile: base64Image
      });
      console.log(base64Image);
    }, (err) => {
      console.log(err);
    });
  }
}
