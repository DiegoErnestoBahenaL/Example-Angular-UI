import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SecuredAppComponent } from './secured-app/secured-app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(
        [{
          path: '', component: SecuredAppComponent,
          children: [
            {path: 'home', component: HomeComponent},
            {path: 'user', component: UsersComponent},
            {path: 'user/new', component: CreateUserComponent},
            {path: 'user/:id', component: UpdateUserComponent},
            {path: 'task', component: TasksComponent},
            {path: 'task/new', component: CreateTaskComponent},
            {path: 'task/:id', component: UpdateTaskComponent},
            {path: '**', component: NotFoundComponent},
          ]
        }]
      )
    ],
    exports: [RouterModule]
  })
  export class SecuredRoutingModule { }
  