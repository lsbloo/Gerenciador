export class Calendar{
    date: string
    description: string
    
    constructor(date: string, description: string){
        this.date=date
        this.description=description
        
    }
    
}
export class CalendarList{
    date: string
    description: string
    id: number
    
    constructor(date: string, description: string, id: number){
        this.date=date
        this.description=description
        this.id=id
    }
}