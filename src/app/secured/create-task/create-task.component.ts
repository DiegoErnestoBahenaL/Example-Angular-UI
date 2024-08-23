import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskModel } from 'src/core/models/task-model';
import { TasksEndpointsService } from 'src/core/services/tasks-endpoints.service';
import * as moment from 'moment';
import { SessionService } from 'src/core/services/session.service';

interface TaskNewControls{
  NameControl : FormControl,
  DescriptionControl : FormControl,
  StartDateControl : FormControl,
  EndDateControl: FormControl,
  StateControl : FormControl
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnDestroy {

  public controls : TaskNewControls;
  public formGroup : FormGroup;

  public subscriptions : Subscription = new Subscription();

  public showError: boolean = false;

  constructor (private tasksEndpoints: TasksEndpointsService, private session: SessionService, private router: Router){
    this.controls = {
      NameControl : new FormControl('', [Validators.required, Validators.maxLength(80)]),
      DescriptionControl : new FormControl('', [Validators.required, Validators.maxLength(80)]),
      StartDateControl: new FormControl('', [Validators.required]),
      EndDateControl : new FormControl('', [Validators.required, Validators.maxLength(20)]),
      StateControl : new FormControl('', [Validators.required])
    };

    this.formGroup = new FormGroup({
      NameControl : this.controls.NameControl,
      DescriptionControl : this.controls.DescriptionControl,
      StartDateControl : this.controls.StartDateControl,
      EndDateControl : this.controls.EndDateControl,
      StateControl : this.controls.StateControl
    });
  }

  public submit (): void{

    
    let startDate = moment(this.controls.StartDateControl.value, "YYYY-MM-DD");
   
    let endDate = moment(this.controls.EndDateControl.value, "YYYY-MM-DD");

    const model : TaskModel = {
      userId: this.session.getUser().id,
      name: this.controls.NameControl.value,
      description : this.controls.DescriptionControl.value,
      startDate : startDate.toISOString(),
      endDate : endDate.toISOString(),
      state : this.controls.StateControl.value
    };

    this.subscriptions.add(this.tasksEndpoints.postTask(model).subscribe(data =>{
      this.router.navigate(['secured/task']);
    }, error =>{
      this.showError = true;
    }))
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
