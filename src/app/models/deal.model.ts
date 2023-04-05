

export class Deal{
    id!:number
    first_name!:string
    last_name!:string
    phone!:string
    company!:string
    status!:string
    date!:Date
    probability_status!:string
    state!:string

    constructor(id:number,first_name:string,last_name:string,phone:string,
        company:string,status:string,date:Date,
        probability_status:string,state:string
        )
        {
            this.id=id;
            this.first_name=first_name;
            this.last_name=last_name;
            this.phone=phone;
            this.company=company;
            this.status=status;
            this.date=date;
            this.probability_status=probability_status;
            this.state=state

    }
    getFullName():string{
        return `${this.first_name} ${this.last_name}`
    }
    
    setStatus(status:string):void{
        this.status=status

    }

}