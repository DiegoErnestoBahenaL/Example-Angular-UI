import { Injectable } from '@angular/core';
import { UserViewModel } from '../models/user-viewmodel';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public isLoggedIn () :boolean {
    return true ? localStorage.getItem(Constants.storagedUserData) !== null : false;
  }

  public isAdmin (): boolean {
    const user = this.getUser();

    return true ? user.roles == 'Admin' : false;
  }

  public getUser (): UserViewModel{
    const stringifiedUser = localStorage.getItem(Constants.storagedUserData) as string;

    let parsedUser: UserViewModel = JSON.parse(stringifiedUser);

    return parsedUser;
  }

  public login (user: UserViewModel){
    localStorage.setItem(Constants.storagedUserData, JSON.stringify(user));
  }

  public logout(){
    localStorage.removeItem(Constants.storagedUserData); 
  }
}
