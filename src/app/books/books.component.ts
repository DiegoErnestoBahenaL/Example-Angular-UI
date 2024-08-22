import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookViewModel } from 'src/core/models/book-viewmodel';
import { LibraryViewModel } from 'src/core/models/library-viewmodel';
import { BooksEndpointsService } from 'src/core/services/books-endpoints.service';
import { LibrariesEndpointsService } from 'src/core/services/libraries-endpoints.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  public subscriptions : Subscription = new Subscription();

  public libraries: LibraryViewModel[] = [];

  public books: BookViewModel[] = [];

  constructor(private booksEndpoints : BooksEndpointsService, private librariesEndpoints: LibrariesEndpointsService,
    private router:Router){}
  
  ngOnInit(): void {
    
    this.subscriptions.add(this.librariesEndpoints.getLibraries().subscribe(data =>{

      this.libraries = data;

      this.subscriptions.add(this.booksEndpoints.getBooks().subscribe(data => {

        this.books = data;
  
      }));

    }));

  }

  public delete(id:number){
    this.subscriptions.add(this.booksEndpoints.deleteBook(id).subscribe(data =>{
      this.subscriptions.add(this.booksEndpoints.getBooks().subscribe(data => {
        this.books = data;
      }))
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public setLibraryName (id: number, libraries: LibraryViewModel[]): string|undefined{
    return libraries.find(x => x.id == id)?.name;
  }
}
