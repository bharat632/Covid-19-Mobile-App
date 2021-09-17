import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatePopoverPage } from './state-popover.page';

const routes: Routes = [
  {
    path: '',
    component: StatePopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatePopoverPageRoutingModule {}
