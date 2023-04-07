import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { Deal } from 'src/app/models/deal.interface';
import { DealService } from 'src/app/services/deal.service';


@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
  providers: []
})
export class DealsComponent implements OnInit, OnDestroy {


// this behavior subject is used to be loaded with the deals and gives it to the deals$
  private dealsSubject = new BehaviorSubject<Deal[]>([]);

  // this subject is used to unsubscribe for the observable
  unsubscribe$: Subject<boolean> = new Subject();

  deals$ = this.dealsSubject.asObservable();

  // this object is used to get the deals of each status
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

  constructor(private dealService: DealService) { }


  ngOnInit(): void {

    this.getDeals()


  }


  getDeals(): void {
    this.dealService.getAllDeals()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.dealsSubject.next(data)
        this.updateFilteredDeals()
      })

  }




// this method is used to drag and drop deals from one status to another and the update deal status

  onDrop(event: CdkDragDrop<Deal[]>, status: string) {

    const { previousContainer, container, previousIndex, currentIndex } = event
    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);

    } else {


      previousContainer.data[previousIndex].status = status
      transferArrayItem(previousContainer.data,
        container.data,
        previousIndex,
        currentIndex);

    }
  }


  onSearch(): void {
    this.updateFilteredDeals();
  }



// this function is used to load the filtered deals to filteredDeals
  updateFilteredDeals(): void {
    this.deals$.pipe(takeUntil(this.unsubscribe$)).subscribe(deals => {
      for (const status of this.statuses) {
        this.filteredDeals[status] = this.filterDeals(deals, status)
          .map(deal => ({ ...deal }));
      }
    });
  }



//  this function is used to return filtered deals according to deal status and searchTerm also
  filterDeals(deals: Deal[], status: string): Deal[] {
    const searchRegex = new RegExp(this.searchTerm, 'i');

    return deals
      .filter(deal => deal.status === status)
      .filter(deal => {
        return searchRegex.test(deal.first_name) ||
          searchRegex.test(deal.last_name) ||
          searchRegex.test(deal.email);
      })



  }





  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
  }
}









