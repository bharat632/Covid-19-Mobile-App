import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CovidDataPageRoutingModule } from './covid-data-routing.module';

import { CovidDataPage } from './covid-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CovidDataPageRoutingModule
  ],
  declarations: [CovidDataPage]
})
export class CovidDataPageModule {}
