import { Injectable } from "@angular/core"
import { Deal } from "./deal.interface"

@Injectable({
    providedIn: 'root'
  })
export class DealDetails implements Deal{
    id!:number
    first_name!:string
    last_name!:string
    phone!:string
    company!:string
    status!:string
    date!:Date
    probability_status!:string
    state!:string
    email!:string

    constructor(
        )
        {
           

    }
    getFullName():string{
        return `${this.first_name} ${this.last_name}`
    }
    
    setStatus(status:string):void{
        this.status=status

    }

}