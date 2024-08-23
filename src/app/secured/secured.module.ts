import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuredAppComponent } from './secured-app/secured-app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SecuredRoutingModule } from './secured-routing.module';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SecuredAppComponent,
    HomeComponent,
    NotFoundComponent,
    UsersComponent,
    TasksComponent,
    CreateUserComponent,
    UpdateUserComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SecuredRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SecuredModule { }
