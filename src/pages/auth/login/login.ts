import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterPage } from '../register/register'
import { EmailValidator } from '../../../validators/email';
import { AuthProvider } from '../../../providers/auth/auth';
import { TabsPage } from '../../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authService: AuthProvider, public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    console.log(this.authService);
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signinUser() {
    if (!this.loginForm.valid) {
      if (this.loginForm.value.email === "" && this.loginForm.value.password === "") {
        let alert = this.alertCtrl.create({
          subTitle: 'Must Enter Email Address and Password',
          buttons: ['OK']
        });
        alert.present();
      } else if (this.loginForm.value.email === "") {
        let alert = this.alertCtrl.create({
          subTitle: 'Must Enter Email Address',
          buttons: ['OK']
        });
        alert.present();
      } else if (this.loginForm.value.password === "") {
        let alert = this.alertCtrl.create({
          subTitle: 'Must Enter Password',
          buttons: ['OK']
        });
        alert.present();
      }
    } else {

      this.loading = this.loadingCtrl.create({
        content: "Authenticating",
        cssClass: "authLoader"
      });
      this.loading.present();
      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authService => {
          console.log(authService);
          localStorage.setItem('uid',authService.uid);
          this.loading.dismiss();
          this.navCtrl.push(TabsPage);
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

  signupRedirect() {
    this.navCtrl.push(RegisterPage);
  }

}
