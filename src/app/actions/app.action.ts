
import {Todo} from '../modal/todo';


//Here we define four actions for CRUD operations respectively

//Read data
export class GetUsers {
    static readonly type = '[User] Get';
}

//Create data 
export class AddUsers {
    static readonly type = '[User] Add';
    constructor(public payload: any) { }
}

//Update data 
export class UpdateUsers {
    static readonly type = '[User] Update';
    constructor(public payload: Todo, public id: number ) { }
}

//Delete data
export class DeleteUsers {
    static readonly type = '[User] Delete';
    constructor(public id: number) { }
}


// select data 
export class SetSelectedTodo {
    static readonly type = '[Todo] Set';

    constructor(public payload: Todo) {
    }
}
