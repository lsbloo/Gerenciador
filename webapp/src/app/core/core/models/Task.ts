
export class Task {

    calendar_id: string
    description: string
    name: string

    constructor(calendar_id: string, name: string, description: string){
        this.calendar_id=calendar_id
        this.description=description
        this.name=name
    }
    
}
export class TarefasList{
    calendar_id: number
    tarefasList: TarefaList

    constructor(calendar_id: number, tarefas: TarefaList){
        this.calendar_id=calendar_id
        this.tarefasList = tarefas
    }
}
export class TarefaList{
    conclusion: boolean
    description: string
    id: number
    name: string
    

    constructor(id: number, name: string, description: string, conclusion: boolean){
        this.id=id
        this.description=description
        this.name=name
        this.conclusion = conclusion
    }
}