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
    // Uncomment this when the bug is fixed on Bluemix to allow mapping scopes to security checks...
    //this.challengeHandler.submitChallengeAnswer({username: this.username, password: this.password});
    
    // Uncomment this to fake out the security by pressing the Logout button, but have the login button do nothing...
    let __viewCtrl = this.viewCtrl;
        this.ngZone.run(() => {
          this.loginInProgress = false;
          __viewCtrl.dismiss();
        });      
//    }
  }  
}
