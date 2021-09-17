import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-state-popover',
  templateUrl: './state-popover.page.html',
  styleUrls: ['./state-popover.page.scss'],
})
export class StatePopoverPage implements OnInit {
  _states:any = [];
  constructor( private covid19 : Covid19Service , private popoverController: PopoverController) { }

  ngOnInit() {

    this.covid19.getCovidDataStateWise().subscribe(stateData =>{
      this._states = stateData;
      console.log("pop state"+this._states.statewise[0].state);
    })
  }

  _dismiss(state:string){
    console.log(state);
    this.popoverController.dismiss({
      "fromPopover":state
    })
  }

}
