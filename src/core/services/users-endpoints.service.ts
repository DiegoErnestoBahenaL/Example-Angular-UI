import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserViewModel } from '../models/user-viewmodel';
import { Constants } from '../constants';
import { Core } from '../core';
import { UserModel } from '../models/user-model';


@Injectable({
  providedIn: 'root'
})
export class UsersEndpointsService {

  constructor(private http: HttpClient) { }


  public getUsers () : Observable <UserViewModel[]>{

    const url: string = Constants.apiHost + 'user';
    const headers = Core.createHttpHeadersJson();

    return this.http.get<UserViewModel[]>(url, {headers: headers});
  }

  public getUser (id: number) : Observable <UserViewModel>{

    const url: string = Constants.apiHost + 'user/' + id;
    const headers = Core.createHttpHeadersJson();

    return this.http.get<UserViewModel>(url, {headers: headers});
  }


  public postUser (model: UserModel) : Observable<any> {
    
    const url: string = Constants.apiHost + 'user';
    const headers = Core.createHttpHeadersJson();

    return this.http.post(url, model, {headers: headers});
  }

  public putUser (idUser: number, model: UserModel) : Observable<any> {
    
    const url: string = Constants.apiHost + 'user/' +idUser;
    const headers = Core.createHttpHeadersJson();

    return this.http.put(url, model, {headers: headers});
  }


  public deleteUser (id: number) : Observable<any> {
    
    const url: string = Constants.apiHost + 'user/' + id;
    const headers = Core.createHttpHeadersJson();

    return this.http.delete(url, {headers: headers});
  }
}
