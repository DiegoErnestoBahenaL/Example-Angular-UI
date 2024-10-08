import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserViewModel } from 'src/core/models/user-viewmodel';
import { UsersEndpointsService } from 'src/core/services/users-endpoints.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public subscriptions : Subscription = new Subscription();

  public users : UserViewModel[] = [];

  constructor(private usersEndpoints: UsersEndpointsService, private router: Router){}

  ngOnInit(): void {
    this.subscriptions.add(this.usersEndpoints.getUsers().subscribe(data =>{

      this.users = data;

    }));
  }

  public delete(id:number){
    this.subscriptions.add(this.usersEndpoints.deleteUser(id).subscribe(data =>{
      this.subscriptions.add(this.usersEndpoints.getUsers().subscribe(data => {
        this.users = data;
      }))
    }))
  }

  public goToEdit(id: number){
    this.router.navigate(['/secured/user/'+ id])
  }


  ngOnDestroy(): void {
    
  }



}
