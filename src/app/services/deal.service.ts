import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable, map } from 'rxjs';
import { Deal } from '../models/deal.interface';


@Injectable({
  providedIn: 'root'
})
export class DealService {
  baseURL=environment.baseUrl


  constructor(private http:HttpClient) { }

  getAllDeals():Observable<Deal[]>{
    return this.http.get<{deals:Deal[]}>(this.baseURL).pipe(map((data)=>data.deals))
  }




}
