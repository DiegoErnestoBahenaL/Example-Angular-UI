import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskViewmodel } from 'src/core/models/task-viewmodel';
import { UserViewModel } from 'src/core/models/user-viewmodel';
import { SessionService } from 'src/core/services/session.service';
import { TasksEndpointsService } from 'src/core/services/tasks-endpoints.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  public subscriptions : Subscription = new Subscription();

  public userLoggedIn : UserViewModel;

  public tasks : TaskViewmodel[] = [];

    constructor(private tasksEndpoints: TasksEndpointsService, private session : SessionService){
      this.userLoggedIn =session.getUser();
    }

    ngOnInit(): void {



      if (this.session.isAdmin()){
        this.subscriptions.add (this.tasksEndpoints.getTasks().subscribe(data =>{
          this.tasks = data;
        }))
      }
      else {
        this.subscriptions.add(this.tasksEndpoints.getTasksForCommonUser(this.userLoggedIn.id).subscribe(data =>{
  
          this.tasks = data;
    
        }));
      }

      
    }
  
    public delete(id:number){
      this.subscriptions.add(this.tasksEndpoints.deleteTask(id).subscribe(data =>{
        if (this.session.isAdmin()){
          this.subscriptions.add (this.tasksEndpoints.getTasks().subscribe(data =>{
            this.tasks = data;
          }))
        }
        else {
          this.subscriptions.add(this.tasksEndpoints.getTasksForCommonUser(this.userLoggedIn.id).subscribe(data =>{
    
            this.tasks = data;
      
          }));
        }


      }))
    }

    public isAdmin():boolean {
      return this.session.isAdmin();
    }
  
    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
    }


  
}
