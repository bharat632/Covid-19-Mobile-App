import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Covid19Service } from '../services/covid19.service';
import { UserService } from '../services/user.service';
import { PopoverPage } from '../popover/popover.page';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatePopoverPage } from '../state-popover/state-popover.page';

@Component({
  selector: 'app-covid-data',
  templateUrl: './covid-data.page.html',
  styleUrls: ['./covid-data.page.scss'],
})
export class CovidDataPage implements OnInit {

  allCountries=[]; //this contain all the country and their data fetch by api
  countryName:string; //user input country name 
  country:string; 
  searchedCountry=[]; //this array returns all searched countries as per user input 
  _states:any=[]; //contain all data related to state 
  _userLocation:any=[]; //contain all data related to user location

  _stateWiseDate:any =[{ 
    stateName : "", //object that contain all cases related to specific state
    active : null,
    recovered : null,
    deaths : null,
    confirmed : null
  }];

  _userLocationData: any =[{  //object that contains all date related to user location
    userState:"",
    userCountry:"",
    userCity:"" 
  }];

  _countryWiseData:any =[{
    countryName:"",
    totalRecovered:"",
    totalConfirmed:"",
    totalDeaths:"",
    totalActive:""
  }]

  //these variables are useful when user switch between countryList and covid-cases-data div
  //switch to divisions as per need
  isAllCountriesShow=true; //this will check will table should be shown to user
  isShownCurrentData=true; //this will check which data should be shown to user current user location data or user-searched data

  //covid cases data variables
  totalRecovered:string;
  totalConfirmed:string;
  totalDeaths:string;
  totalActive:string;

  //user location data variables
  latitude:number;
  longitude:number;

  //userLoacality variables
  


  constructor( public popoverController: PopoverController , private covid19 : Covid19Service , private platform : Platform , private geolocation: Geolocation , private  userService : UserService) {
  }
  ngOnInit() {
    this.getCountries();
    // this.getCovidDataStateWise("uttar pradesh");
  }

  //filter duration( 1-week , 1-month , All days) popover
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component:PopoverPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    popover.onDidDismiss()
    .then((data:any)=>{

      console.log("Popover data" , data.data.fromPopover);

    });

    return  await popover.present();
  }

  async presentPopoverState() {
    const popover = await this.popoverController.create({
      component:StatePopoverPage,
      cssClass: 'my-custom-class',
      translucent: true
    });
    
    popover.onDidDismiss().then(data =>{
      
      this.getCovidDataStateWise(data.data.fromPopover);
    })

    return await popover.present();
  }

  //get all countries name form covid19-world-api 
  getCountries(){
    this.covid19.getAllCountrieswithFlag().subscribe(data=>{
      this.allCountries = data;
      this.getCovidDataCountryWise("India");
      this.getCovidDataStateWise("Uttar Pradesh");
    });
  }

  //searched countries as per user input 
  searchedCountries(){
    var count=0;
    this.searchedCountry = [];
    if(this.countryName != ""){
      this.isAllCountriesShow = false;
      this.isShownCurrentData = false;
      for(var i=0;i<this.allCountries.length -1;i++){
        if(this.allCountries[i].country.toLowerCase().match(this.countryName)){
          this.searchedCountry[count] = this.allCountries[i];
          count+=1;
        }
        else{
          continue;
        } 
      }
    }
    else{
      this.isAllCountriesShow=true;
      this.isShownCurrentData=true;
    }
  }

  //return all data related to specific country
  getCovidDataCountryWise(userSeletedCountry:string){

    if(this.isShownCurrentData == false){
      this.isShownCurrentData = true;
    }

    this.country = userSeletedCountry;
    for(var i=0;i<this.allCountries.length -1;i++){
      if(this.allCountries[i].country.toLowerCase().match(userSeletedCountry.toLowerCase())){
        this.totalActive = this.allCountries[i].active;
        this.totalConfirmed = this.allCountries[i].cases;
        this.totalRecovered = this.allCountries[i].recovered;
        this.totalDeaths = this.allCountries[i].deaths;
      }
    }
  }

  //return all the related  to specific searched state
  getCovidDataStateWise(userSelectedState:string){
    this._stateWiseDate.name = userSelectedState;
    this.covid19.getCovidDataStateWise().subscribe(stateData=>{
      this._states = stateData;
      for(var i=0;i<this._states.statewise.length -1; i++){
        if(this._states.statewise[i].state.toLowerCase().match(userSelectedState.toLowerCase())){
          this._stateWiseDate.active = this._states.statewise[i].active;
          this._stateWiseDate.confirmed = this._states.statewise[i].confirmed;
          this._stateWiseDate.deaths = this._states.statewise[i].deaths;
          this._stateWiseDate.recovered = this._states.statewise[i].recovered;
        }
      }
    })
  }

  //get user current location latitude and longitude 
  getUserCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.userService.getUserLocality(this.latitude , this.longitude).subscribe(localityData=>{
        this._userLocation = localityData;
        this._userLocationData.userCountry = this._userLocation.countryName;
        this._userLocationData.userState = this._userLocation.principalSubdivision;
        this._userLocationData.userCity = this._userLocation.locality;

        alert("Current Location is : " + this._userLocation.countryName +" "+this._userLocation.principalSubdivision+" "+"("+this._userLocation.localityInfo.administrative[3].name+")");
        this.getCovidDataStateWise(this._userLocationData.userState);
        this.getCovidDataCountryWise(this._userLocationData.userCountry);
      
      })

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }


  //header back button
  back(){
    window.history.back();
  }
}
