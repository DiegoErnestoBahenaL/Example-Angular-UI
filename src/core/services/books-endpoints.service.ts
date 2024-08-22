import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BookViewModel } from '../models/book-viewmodel';
import { Constants } from '../constants';
import { Core } from '../core';
import { BookModel } from '../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class BooksEndpointsService {

  constructor(private http: HttpClient) { }

  public getBooks () : Observable <BookViewModel[]>{

    const url: string = Constants.apiHost + 'books';
    const headers = Core.createHttpHeadersJson();

    return this.http.get<BookViewModel[]>(url, {headers: headers});
  }

  public getBook (id: number) : Observable <BookViewModel>{

    const url: string = Constants.apiHost + 'books/' + id;
    const headers = Core.createHttpHeadersJson();

    return this.http.get<BookViewModel>(url, {headers: headers});
  }

  public getBookByName (name: string) : Observable <BookViewModel>{

    const url: string = Constants.apiHost + 'books/name?name=' + name;
    const headers = Core.createHttpHeadersJson();

    return this.http.get<BookViewModel>(url, {headers: headers});
  }

  public postBook (model: BookModel) : Observable<any> {
    
    const url: string = Constants.apiHost + 'books';
    const headers = Core.createHttpHeadersJson();

    return this.http.post(url, model, {headers: headers});
  }

  public deleteBook (id: number) : Observable<any> {
    
    const url: string = Constants.apiHost + 'books/' + id;
    const headers = Core.createHttpHeadersJson();

    return this.http.delete(url, {headers: headers});
  }
}
