import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { BooksComponent } from './books/books.component';
import { NewLibraryComponent } from './new-library/new-library.component';
import { NewBookComponent } from './new-book/new-book.component';
import { SearchLibraryComponent } from './search-library/search-library.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibrariesComponent,
    BooksComponent,
    NewLibraryComponent,
    NewBookComponent,
    SearchLibraryComponent,
    SearchBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
