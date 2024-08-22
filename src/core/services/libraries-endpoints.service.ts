import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LibraryViewModel } from '../models/library-viewmodel';
import { Constants } from '../constants';
import { Core } from '../core';
import { LibraryModel } from '../models/library-model';


@Injectable({
  providedIn: 'root'
})
export class LibrariesEndpointsService {

  constructor(private http: HttpClient) { }

  public getLibraries () : Observable <LibraryViewModel[]>{

    const url: string = Constants.apiHost + 'libraries';
    const headers = Core.createHttpHeadersJson();

    return this.http.get<LibraryViewModel[]>(url, {headers: headers});
  }

  public getLibrary (id: number) : Observable <LibraryViewModel>{

    const url: string = Constants.apiHost + 'libraries/' + id;
    const headers = Core.createHttpHeadersJson();

    return this.http.get<LibraryViewModel>(url, {headers: headers});
  }

  public getLibraryByName (name: string) : Observable <LibraryViewModel>{

    const url: string = Constants.apiHost + 'libraries/name?name=' + name;
    const headers = Core.createHttpHeadersJson();

    return this.http.get<LibraryViewModel>(url, {headers: headers});
  }

  public postLibrary (model: LibraryModel) : Observable<any> {
    
    const url: string = Constants.apiHost + 'libraries';
    const headers = Core.createHttpHeadersJson();

    return this.http.post(url, model, {headers: headers});
  }

  public deleteLibrary (id: number) : Observable<any> {
    
    const url: string = Constants.apiHost + 'libraries/' + id;
    const headers = Core.createHttpHeadersJson();

    return this.http.delete(url, {headers: headers});
  }
}
