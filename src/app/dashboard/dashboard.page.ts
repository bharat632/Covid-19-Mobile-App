import { Component, OnInit } from '@angular/core';
import { IonToggle, MenuController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  username = "";

  constructor(private menuController: MenuController, private vibration: Vibration, private route: Router, private callNumber: CallNumber , private nativeStorage: NativeStorage , private localNotifications : LocalNotifications) {
    
  }

  ngOnInit() {
    this.getUsername();
    this._notification();
  }

  //get a notification of app 
  _notification(){
    this.localNotifications.schedule({
      title:"Covid-19 Live Tracker",
      id: 1,
      text: 'Stay Home Stay Safe.',
    });
  }

  //get username
  getUsername() {
    this.nativeStorage.getItem('username')
      .then(
        data =>{ this.username = data;

        }
      );
  }

  //menu function
  async openMenu() {
    await this.menuController.open();
  }

  closeMenu(){
    this.menuController.toggle();
  }

  //to create a call to government 
  callFunction() {
    this.callNumber.callNumber("+91-11-23978046", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  //to provide vibration
  provideVibration() {
    this.vibration.vibrate(1000);
  }


}
