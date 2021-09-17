import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  list : any=[
    "Weekly",
    "Monthly",
    "Complete"
  ]

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  getDuration(duration:string){
    console.log(duration);
    this.popoverController.dismiss({
      "fromPopover":duration
    });
  }

}
