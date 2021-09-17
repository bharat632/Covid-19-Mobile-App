import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Covid19Service {
  urlCountries="https://corona.lmao.ninja/v2/countries";

  constructor( private httpClient:HttpClient) { }

  // getCountries(){
  //   return this.httpClient.get<any>("https://api.covid19api.com/countries");
  // }

  //return all the counttries name with their flags
  getAllCountrieswithFlag(){
    return this.httpClient.get<any>(this.urlCountries);
  }

  //return all the the data of states india only
  getCovidDataStateWise(){
    return this.httpClient.get("https://api.covid19india.org/data.json");
  }
}
