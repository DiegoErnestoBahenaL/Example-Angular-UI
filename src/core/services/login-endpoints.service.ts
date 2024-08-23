import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login-model';
import { Constants } from '../constants';
import { Core } from '../core';
import { UserViewModel } from '../models/user-viewmodel';

@Injectable({
  providedIn: 'root'
})
export class LoginEndpointsService {

  constructor(private http: HttpClient) { }


  public login (model: LoginModel) : Observable<UserViewModel> {
    
    const url: string = Constants.apiHost + 'login';
    const headers = Core.createHttpHeadersJson();

    return this.http.post<UserViewModel>(url, model, {headers: headers});
  }
}
