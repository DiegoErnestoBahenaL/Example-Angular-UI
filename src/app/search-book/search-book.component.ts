import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookViewModel } from 'src/core/models/book-viewmodel';
import { LibraryViewModel } from 'src/core/models/library-viewmodel';
import { BooksEndpointsService } from 'src/core/services/books-endpoints.service';
import { LibrariesEndpointsService } from 'src/core/services/libraries-endpoints.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit, OnDestroy {

  public subscription = new Subscription();

  public book : BookViewModel|null = null;

  public libraries : LibraryViewModel[] = [];

  public notFound : boolean = false;

  public searchControl = new FormControl();

  constructor(private librariesEndpoints: LibrariesEndpointsService, private booksEndpoints: BooksEndpointsService){

  }
  ngOnInit(): void {
    this.subscription.add(this.librariesEndpoints.getLibraries().subscribe(data =>{
      this.libraries = data;     
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public search(): void{
    const name : string = this.searchControl.value;

    this.booksEndpoints.getBookByName(name).subscribe(data => {
      this.book = data;
      this.notFound = false;
    }, error => {
      this.book = null;
      this.notFound = true;
    });
  }


  public setLibraryName (id: number|undefined, libraries: LibraryViewModel[]): string|undefined{
    return libraries.find(x => x.id == id)?.name;
  }
}
