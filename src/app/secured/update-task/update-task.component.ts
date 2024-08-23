import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskModel } from 'src/core/models/task-model';
import { TasksEndpointsService } from 'src/core/services/tasks-endpoints.service';
import * as moment from 'moment';
import { SessionService } from 'src/core/services/session.service';

interface TaskEditControls{
  NameControl : FormControl,
  DescriptionControl : FormControl,
  StartDateControl : FormControl,
  EndDateControl: FormControl,
  StateControl : FormControl
}

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnDestroy, OnInit {
  public controls : TaskEditControls;
  public formGroup : FormGroup;

  public subscriptions : Subscription = new Subscription();

  public showError: boolean = false;

  public idTask: number;

  constructor (private tasksEndpoints: TasksEndpointsService, private session: SessionService, private router: Router, private route: ActivatedRoute){
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

    this.idTask = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.subscriptions.add(this.tasksEndpoints.getTask(this.idTask).subscribe(data => {
      this.controls.NameControl.setValue(data.name);
      this.controls.DescriptionControl.setValue(data.description);
      this.controls.StateControl.setValue(data.state);
      this.controls.StartDateControl.setValue(moment(data.startDate).format("YYYY-MM-DD"));
      this.controls.EndDateControl.setValue(moment(data.startDate).format("YYYY-MM-DD"));
    }));
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

    this.subscriptions.add(this.tasksEndpoints.putTask(this.idTask,model).subscribe(data =>{
      this.router.navigate(['secured/task']);
    }, error =>{
      this.showError = true;
    }))
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
