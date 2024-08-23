import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { Core } from '../core';
import { TaskViewmodel } from '../models/task-viewmodel';
import { TaskModel } from '../models/task-model';


@Injectable({
  providedIn: 'root'
})
export class TasksEndpointsService {

  constructor(private http: HttpClient) { }

  public getTasks () : Observable <TaskViewmodel[]>{

    const url: string = Constants.apiHost + 'task';
    const headers = Core.createHttpHeadersJson();

    return this.http.get<TaskViewmodel[]>(url, {headers: headers});
  }

  public getTasksForCommonUser (idUser: number) : Observable<TaskViewmodel[]>{
    const url: string = Constants.apiHost + 'task/fromcommonuser/' + idUser;
    const headers = Core.createHttpHeadersJson();

    return this.http.get<TaskViewmodel[]>(url, {headers: headers});
  }

  public getTask (id: number) : Observable <TaskViewmodel>{

    const url: string = Constants.apiHost + 'task/' + id;
    const headers = Core.createHttpHeadersJson();

    return this.http.get<TaskViewmodel>(url, {headers: headers});
  }


  public postTask (model: TaskModel) : Observable<any> {
    
    const url: string = Constants.apiHost + 'task';
    const headers = Core.createHttpHeadersJson();

    return this.http.post(url, model, {headers: headers});
  }

  public putTask (idTask: number, model: TaskModel) : Observable<any> {
    
    const url: string = Constants.apiHost + 'task/' + idTask;
    const headers = Core.createHttpHeadersJson();

    return this.http.put(url, model, {headers: headers});
  }


  public deleteTask (id: number) : Observable<any> {
    
    const url: string = Constants.apiHost + 'task/' + id;
    const headers = Core.createHttpHeadersJson();

    return this.http.delete(url, {headers: headers});
  }
}
