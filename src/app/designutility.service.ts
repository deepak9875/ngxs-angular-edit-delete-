import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Todo } from './modal/todo';

@Injectable({
  providedIn: 'root'
})
export class DesignutilityService {

  constructor(private http:HttpClient) { }

  fetchUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  addUsers(payload :Todo){
    return this.http.post('https://jsonplaceholder.typicode.com/users',payload);
  }

  deleteUser(id:number){
    return this.http.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  updateUser(payload: Todo ,id: number){
    return this.http.put( `https://jsonplaceholder.typicode.com/users/${id}`, payload);
  }
}
