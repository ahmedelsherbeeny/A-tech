import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Deal } from 'src/app/models/deal.interface';
import {  DealDetails } from 'src/app/models/deal.model';
import { DealService } from 'src/app/services/deal.service';


@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
  providers:[DealDetails]
})
export class DealsComponent implements OnInit {



  private dealsSubject = new BehaviorSubject<Deal[]>([]);
  deals$ = this.dealsSubject.asObservable();
    filteredDeals: { [key: string]: Deal[] } = {
    'Potential Value': [],
    'Focus': [],
    'Contact Made': [],
    'Offer Sent': [],
    'Getting Ready': [],
    'Closed': []
  
  };
  statuses: string[] = Object.keys(this.filteredDeals);
  searchTerm: string = '';

      constructor(private dealService:DealService){}                   

ngOnInit(): void {
  this.getDeals()



  
  }

  getDeals(): void {
    this.dealService.getAllDeals().subscribe(data=>{
      this.dealsSubject.next(data)
      this.updateFilteredDeals()
    })
   
  }
 

  


  onDrop(event: CdkDragDrop<Deal[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        console.log(event)
      
    }
  }

  onSearch(): void {
    this.updateFilteredDeals();
    console.log(this.searchTerm)
  }
  
  updateFilteredDeals(): void {
    this.deals$.subscribe(deals => {
      for (const status of this.statuses) {
        this.filteredDeals[status] = deals
          .filter(deal => deal.status === status)
          .filter(deal => {
            const searchRegex = new RegExp(this.searchTerm, 'i');
            return searchRegex.test(deal.first_name) ||
                   searchRegex.test(deal.last_name) ||
                   searchRegex.test(deal.email);
          })
          .map(deal => ({ ...deal }));
      }
      console.log(this.searchTerm)
    });    
  }
}

  

 





