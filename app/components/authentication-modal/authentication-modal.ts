import { Component, NgZone } from '@angular/core';
import {Modal, NavController, ViewController, NavParams} from 'ionic-angular';


@Component({
  selector: 'authentication-modal',
  templateUrl: 'build/components/authentication-modal/authentication-modal.html'
})
export class AuthenticationModal {

  username: string;
  password: string;
  loginError: string;
  challengeHandler: any;
  loginInProgress: boolean;

  constructor(private viewCtrl: ViewController, navParams: NavParams, private ngZone: NgZone) {
    this.challengeHandler = navParams.get("challengeHandler");
    this.loginInProgress = false;
    let __viewCtrl = viewCtrl;
    this.challengeHandler.handleFailure = (error) => {
      this.loginInProgress = false;
      this.loginError = error.errorMsg;
    }    
    this.challengeHandler.handleSuccess = (successData) => {
      this.ngZone.run(() => {
        this.loginInProgress = false;
        __viewCtrl.dismiss();
      });
    }       
  }

  login() {
    this.loginInProgress = true;
    this.challengeHandler.submitChallengeAnswer({username: this.username, password: this.password});
  }  
}
