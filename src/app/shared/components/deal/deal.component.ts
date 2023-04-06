import { Component, Input } from '@angular/core';
import { Deal } from 'src/app/models/deal.interface';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent {
  @Input() deal!:any

}
