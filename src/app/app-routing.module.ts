import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { NewLibraryComponent } from './new-library/new-library.component';
import { BooksComponent } from './books/books.component';
import { NewBookComponent } from './new-book/new-book.component';
import { SearchLibraryComponent } from './search-library/search-library.component';
import { SearchBookComponent } from './search-book/search-book.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'libraries', component: LibrariesComponent},
  {path: 'libraries/new', component: NewLibraryComponent},
  {path: 'libraries/search', component: SearchLibraryComponent},
  {path: 'books', component: BooksComponent},
  {path: 'books/new', component: NewBookComponent},
  {path: 'books/search', component: SearchBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
