import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/core/models/user-model';
import { UsersEndpointsService } from 'src/core/services/users-endpoints.service';

interface UserNewControls{
  NameControl : FormControl,
  LastNameControl : FormControl,
  EmailControl : FormControl,
  PasswordControl : FormControl,
  RoleControl : FormControl
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnDestroy {


  public controls : UserNewControls;
  public formGroup : FormGroup;

  public subscriptions : Subscription = new Subscription();

  public showError: boolean = false;

  constructor (private userEndpoints: UsersEndpointsService, private router: Router){
    this.controls = {
      NameControl : new FormControl('', [Validators.required, Validators.maxLength(80)]),
      LastNameControl : new FormControl('', [Validators.required, Validators.maxLength(80)]),
      EmailControl: new FormControl('', [Validators.required]),
      PasswordControl : new FormControl('', [Validators.required, Validators.maxLength(20)]),
      RoleControl : new FormControl('', [Validators.required])
    };

    this.formGroup = new FormGroup({
      NameControl : this.controls.NameControl,
      LastNameControl : this.controls.LastNameControl,
      EmailControl : this.controls.EmailControl,
      PasswordControl : this.controls.PasswordControl,
      RoleControl : this.controls.RoleControl
    });
  }

  public submit (): void{
    const model : UserModel = {
      name: this.controls.NameControl.value,
      lastName : this.controls.LastNameControl.value,
      email : this.controls.EmailControl.value,
      password : this.controls.PasswordControl.value,
      roles : this.controls.RoleControl.value
    };

    this.subscriptions.add(this.userEndpoints.postUser(model).subscribe(data =>{
      this.router.navigate(['secured/user']);
    }, error =>{
      this.showError = true;
    }))
  }



  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

  }
}
