import { Pipe, PipeTransform } from '@angular/core';
import { Deal } from 'src/app/models/deal.interface';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(deals:Deal[],status:string): any[] {
    if(!deals){
      return []
    }
    if(!status){
      return []
    }
    return deals.filter((deal:Deal)=>deal.status===status)

  }

}
