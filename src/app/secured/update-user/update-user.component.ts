import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  public controls : UserNewControls;
  public formGroup : FormGroup;
  public userId :number;
  public subscriptions : Subscription = new Subscription();

  public showError: boolean = false;
  constructor (private userEndpoints: UsersEndpointsService, private router: Router, private route: ActivatedRoute){
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

    this.userId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.subscriptions.add(this.userEndpoints.getUser(this.userId).subscribe(data=>{
      this.controls.NameControl.setValue(data.name);
      this.controls.EmailControl.setValue(data.email);
      this.controls.LastNameControl.setValue(data.lastName);
      this.controls.RoleControl.setValue(data.roles);
    }))
  }

  public submit (): void{
    const model : UserModel = {
      name: this.controls.NameControl.value,
      lastName : this.controls.LastNameControl.value,
      email : this.controls.EmailControl.value,
      password : this.controls.PasswordControl.value,
      roles : this.controls.RoleControl.value
    };

    this.subscriptions.add(this.userEndpoints.putUser(this.userId, model).subscribe(data =>{
      this.router.navigate(['secured/user']);
    }, error =>{
      this.showError = true;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

  }
}
