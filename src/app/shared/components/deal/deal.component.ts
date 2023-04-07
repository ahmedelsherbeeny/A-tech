import { Component, Input } from '@angular/core';
import { Deal } from 'src/app/models/deal.interface';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent {

  // this input accepts a deal of type Deal and then spread the data of each deal in a card
  @Input() deal!:any

}
