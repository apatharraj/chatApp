import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';

import { LoginPage } from '../login/login';
// import { AddMobilePage } from '../add-mobile/add-mobile';
import { ProfilePage } from '../profile/profile';

import { EmailValidator } from '../../../validators/email';
import { AuthProvider } from '../../../providers/auth/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public signupForm: FormGroup;
  public loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authService: AuthProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  signupUser() {
    if (!this.signupForm.valid) {
      if (this.signupForm.value.email === "" && this.signupForm.value.password === "") {
        let alert = this.alertCtrl.create({
          subTitle: 'Must Enter Email Address and Password',
          buttons: ['OK']
        });
        alert.present();
      } else if (this.signupForm.value.email === "") {
        let alert = this.alertCtrl.create({
          subTitle: 'Must Enter Email Address',
          buttons: ['OK']
        });
        alert.present();
      } else if (this.signupForm.value.password === "") {
        let alert = this.alertCtrl.create({
          subTitle: 'Must Enter Password',
          buttons: ['OK']
        });
        alert.present();
      }
    } else {
      this.loading = this.loadingCtrl.create({
        content: "Signing Up",
        cssClass: "authLoader"
      });
      this.loading.present();
      this.authService.registerUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(authService => {
          console.log(authService);
          this.addNewUser(authService, this.signupForm.value.password);
          this.loading.dismiss();
          this.navCtrl.push(ProfilePage);
        }, error => {
          console.log(error);
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            subTitle: error.message,
            buttons: ['OK']
          });
          alert.present();
        });

    }

  }
  addNewUser(user, password) {
    console.log(user, password);
    firebase.database().ref('/Users').child(firebase.auth().currentUser.uid).update({
      Email: user.email,
      uid: user.uid,
      Password: password
    });
    debugger;
  }
  signinRedirect() {
    this.navCtrl.push(LoginPage);
  }

}