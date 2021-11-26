import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable,Subscription } from 'rxjs';
import { AddUsers, DeleteUsers, GetUsers, SetSelectedTodo, UpdateUsers } from '../actions/app.action';
import { Todo } from '../modal/todo';
import { AppState } from '../states/app.state';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit ,OnDestroy{

  //Here I have used Reactive Form, you can also use Template Driven Form instead
  userForm: FormGroup;
  editTodo = false;

  userInfo: [];
  private formSubscription: Subscription = new Subscription();

  @Select(AppState.getStateData) user: Observable<Todo>;



  constructor(private store: Store, private fb: FormBuilder) {  this.createForm(); }

  
  createForm() {
     this.userForm = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
      website: ['']
    })
  }
  ngOnInit() {
   

    this.store.dispatch(new GetUsers());

    this.formSubscription.add(
      this.user.subscribe(todo=>{
        if(todo){
          this.userForm.patchValue({
            name:todo.name,
            id:todo.id,
            username:todo.username,
            email:todo.email,
            phone:todo.phone,
            website:todo.website
          });
          this.editTodo = true;
        }
        else{
          this.editTodo =false;
        }
      })
    )

    
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  //  submit function 
   addUser(){
     if(this.editTodo){
       this.formSubscription.add(
         this.store.dispatch(new UpdateUsers(this.userForm.value,this.userForm.value.id)).subscribe(()=>{
           this.clearForm();
         })
       )
     }
     else{
       this.formSubscription.add(
         this.formSubscription= this.store.dispatch(new AddUsers(this.userForm.value)).subscribe(()=>{
           this.clearForm();
         })
       )
     }
   }

//  clear function 

 clearForm() {
    this.userForm.reset();
    this.store.dispatch(new SetSelectedTodo(null));
  }

 clearFormData() {
    this.userForm.reset();
    // this.store.dispatch(new SetSelectedTodo(null));
  }
   
  // edit function

    updateUser(payload : any) {

    this.store.dispatch(new SetSelectedTodo( payload ));
  }

  //  delete function
  deleteUser(i) {
    console.log("The i value is:-", i);
    this.store.dispatch(new DeleteUsers(i));
  }

    @Select(AppState.selectStateData) users: Observable<Todo[]>;

}
