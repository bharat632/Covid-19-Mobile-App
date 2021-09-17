import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NearbyCovidCentrePageRoutingModule } from './nearby-covid-centre-routing.module';

import { NearbyCovidCentrePage } from './nearby-covid-centre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NearbyCovidCentrePageRoutingModule
  ],
  declarations: [NearbyCovidCentrePage]
})
export class NearbyCovidCentrePageModule {}
