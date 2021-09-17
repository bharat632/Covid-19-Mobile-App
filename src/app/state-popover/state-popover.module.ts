import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatePopoverPageRoutingModule } from './state-popover-routing.module';

import { StatePopoverPage } from './state-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatePopoverPageRoutingModule
  ],
  declarations: [StatePopoverPage]
})
export class StatePopoverPageModule {}
