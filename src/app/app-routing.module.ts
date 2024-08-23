import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './secured/home/home.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'secured', loadChildren: () => import('src/app/secured/secured.module').then(m => m.SecuredModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
