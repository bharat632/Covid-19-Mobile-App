import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NearbyCovidCentrePage } from './nearby-covid-centre.page';

const routes: Routes = [
  {
    path: '',
    component: NearbyCovidCentrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NearbyCovidCentrePageRoutingModule {}
