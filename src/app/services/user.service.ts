import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private nativeStorage:NativeStorage , private http : HttpClient) { }

  //generate otp here
  generateOtp(){
    var randomVariable='1234567890';
    var otp='';
    for(var i=0;i<4;i++){
      otp = otp + randomVariable[Math.floor(Math.random() * randomVariable.length)];
    }
    return otp;
  }


  getUserLocality(lat:number , long:number ){
    return this.http.get("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=+lat+&longitude=+long+&localityLanguage=en");
  }

}
