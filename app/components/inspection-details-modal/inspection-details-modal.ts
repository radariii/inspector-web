import { Component, NgZone, ElementRef } from '@angular/core';
import {Modal, NavController, ViewController, NavParams} from 'ionic-angular';


@Component({
  selector: 'inspection-details-modal',
  templateUrl: 'build/components/inspection-details-modal/inspection-details-modal.html'
})
export class InspectionDetailsModal {

  inspection: any;
  inspectors: Array<any>;

  constructor(private viewCtrl: ViewController, navParams: NavParams, private ngZone: NgZone, private _elementRef: ElementRef) {
    this.inspection = navParams.get("inspection");      
    this.inspectors = navParams.get("inspectors");
    document.querySelector("ion-modal").className += "inspectionDetails"
  }

  save() {
    this.viewCtrl.dismiss(this.inspection);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }  

  lookupLocation(){
    if (this.inspection.name == "12"){
      this.inspection.name = "Store #12";
      this.inspection.location = "180 Somerville Ave, Somerville, MA 02143";
      this.inspection.reason = "";
      this.inspection.contactName = "Bob Parker";
      this.inspection.contactPhone = "617-776-4036";
      this.inspection.lat = 42.376285;
      this.inspection.lng = -71.090584;
    }
  }
  
  
}
