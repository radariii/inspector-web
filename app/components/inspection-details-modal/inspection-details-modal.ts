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
  
}
