import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController, Modal} from 'ionic-angular';
import { AuthenticationModal } from '../../components/authentication-modal/authentication-modal';
import { InspectionDetailsModal } from '../../components/inspection-details-modal/inspection-details-modal';
import { AdapterService } from '../../providers/adapter-service/adapter-service';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

declare var WL: any;
declare var WLAuthorizationManager: any;

@Component({
  templateUrl: 'build/pages/main/main.html',
  directives: [GOOGLE_MAPS_DIRECTIVES]
})
export class MainPage {

  @ViewChild('leftColumn') leftColumn: any;
  @ViewChild('rightColumn') rightColumn: any;

  columnHeight: number;
  inspections: Array<any>; 
  inspectors: Array<any>; 
  challengeHandler: any;
  loginInProgress: boolean = false;
  loginModal: Modal;
  selectedInspection = null;
  selectedInspector = null;
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private nav: NavController, private elementRef: ElementRef, private _ngZone: NgZone, private adapterService:AdapterService) {
    this.challengeHandler = WL.Client.createSecurityCheckChallengeHandler("UserLoginSecurityCheck");
    let _stepUpChallengeHandler = this.challengeHandler;
    let __nav = nav;
    this.challengeHandler.handleChallenge = (challenge: any) => {
      if (!this.loginInProgress){
        this.loginInProgress = true;
        this.showLoginModal();
      } else if (challenge.errorMsg){
        //this.loginModal.loginError = challenge.errorMsg;
      }
    }
    this.challengeHandler.handleFailure = (error) => {
//      this.stepUpLoginError = error.errorMsg;
    }    
    this.challengeHandler.handleSuccess = (successData) => {
      this._ngZone.run(() => {
        __nav.pop();
      });
    }       
  }

  showLoginModal() {
    this.loginModal = Modal.create(AuthenticationModal, {challengeHandler: this.challengeHandler});
    this.loginModal.onDismiss(() => {
      this.loginInProgress = false;
      this.loginModal = null;
    });
    this._ngZone.run(() => {
      this.nav.present(this.loginModal);
    })
  }

  selectInspection(inspection){
    this.selectedInspection = inspection;
  }

  selectInspector(inspector){
    this.selectedInspector = inspector;
  }

  openInspectionDetails(event){
    let newInspection = {
      "id": String(new Date().getTime()),
      "name": "",
      "type": "FOOD",
      "location": "",
      "reason": "",
      "contactName": "",
      "contactPhone": "",
      "status": "NOT_STARTED",
      "startTime": "",
      "duration": null,
      "inspector": "",
      "lat": 51.65,
      "lng": 7.82,
      "incidents": []
    }
    let detailsModal  = Modal.create(InspectionDetailsModal, {inspection: newInspection, inspectors: this.inspectors});
    detailsModal.onDismiss((data) => {
      if (data){
        this.inspections.push(data);
      }
    });
//    this._ngZone.run(() => {
      this.nav.present(detailsModal);
//    })
    
  }

  logout() {
    WLAuthorizationManager.logout("UserLoginSecurityCheck").then(() => this.showLoginModal());
  }  

  onPageWillEnter(){
    this.adapterService.callAdapter("Inspections", "inspections", "GET", null).then( 
      (response) => {
        this.inspections = response;
      },
      (error) => {
        this.inspections = [
                  {
                    "id": "1",
                    "name": "The Owl & Firkin Pub",
                    "type": "FOOD",
                    "location": "5440 Yonge St, Toronto, ON",
                    "reason": "Regular inspection date reached. Inspection frequency: once per year",
                    "contactName": "Jimmy Jamison",
                    "contactPhone": "416-323-2121",
                    "status": "NOT_STARTED",
                    "startTime": "2014-07-01 15:16:17",
                    "duration": null,
                    "inspector": "1",
                    "lat": 51.65,
                    "lng": 7.82,
                    "incidents": []
                  },
                  {
                    "id": "1",
                    "name": "The Snooty Fox",
                    "type": "FOOD",
                    "location": "5440 Yonge St, Toronto, ON",
                    "reason": "Regular inspection date reached. Inspection frequency: once per year",
                    "contactName": "Jimmy Jamison",
                    "contactPhone": "416-323-2121",
                    "status": "NOT_STARTED",
                    "startTime": "2014-07-01 15:16:17",
                    "duration": null,
                    "inspector": "1",
                    "lat": 51.62,
                    "lng": 7.84,
                    "incidents": []
                  }                  
                ];                
      }
    ).then(
      () => {
          this.adapterService.callAdapter("Inspectors", "inspectors", "GET", null).then( 
            (response) => {
              this.inspectors = response;
            },
            (error) => {
              this.inspectors = [
                {
                  "id": "1",
                  "icon": "http://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png",
                  "username": "ian",
                  "location": "123 Front Street, Toronto, ON",
                  "name": "Ian Ingram",
                  "inspectionsRemaining": 3,
                  "inspectionsCompleted": 4,
                  "password": "password"
                },
                {
                  "id": "2",
                  "icon": "http://maps.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png",
                  "username": "rachel",
                  "location": "2803 Eglinton Ave E, Toronto, ON",
                  "name": "Rachel Wilson",
                  "inspectionsRemaining": 6,
                  "inspectionsCompleted": 3,
                  "password": "password"
                },
                {
                  "id": "3",
                  "icon": "http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png",
                  "username": "jimmy",
                  "location": "2133 Jane St, Toronto, ON",
                  "name": "Jimmy Jamison",
                  "inspectionsRemaining": 4,
                  "inspectionsCompleted": 1,
                  "password": "password"
                },
                {
                  "id": "4",
                  "icon": "http://maps.google.com/intl/en_us/mapfiles/ms/micons/orange-dot.png",
                  "username": "wendy",
                  "location": "861 Danforth Ave, Toronto, ON",
                  "name": "Wendy Williams",
                  "inspectionsRemaining": 2,
                  "inspectionsCompleted": 4,
                  "password": "password"
                }
              ];
            }
          );  
      }        
    );     
  }

  onResize(event){
    let rect = this.elementRef.nativeElement.querySelector(".leftColumn").getBoundingClientRect();
    this.columnHeight = (window.innerHeight - rect.top - 10);
  }  

}
