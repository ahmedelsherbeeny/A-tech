import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { DealsComponent } from './components/deals/deals.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DealComponent } from '../shared/components/deal/deal.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    DealsComponent,
    DealComponent

  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    DragDropModule,
    FormsModule
  ],
  exports:[
  ]
})
export class FeaturesModule { }
