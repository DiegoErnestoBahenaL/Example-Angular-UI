import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookModel } from 'src/core/models/book-model';
import { LibraryViewModel } from 'src/core/models/library-viewmodel';
import { BooksEndpointsService } from 'src/core/services/books-endpoints.service';
import { LibrariesEndpointsService } from 'src/core/services/libraries-endpoints.service';

interface BookNewControls{
  TitleControl : FormControl,
  DescriptionControl : FormControl,
  AuthorControl : FormControl,
  BrandControl : FormControl,
  PriceControl : FormControl,
  LibraryIdControl : FormControl
}


@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();
  
  public formGroup : FormGroup;

  public controls : BookNewControls;

  public libraries : LibraryViewModel[] = [];

  public showError : boolean = false;


  constructor(private booksEndpoints: BooksEndpointsService, private librariesEndpoints: LibrariesEndpointsService,
    private router: Router){
    this.controls = {
      TitleControl : new FormControl('', [Validators.required, Validators.maxLength(50)]),
      DescriptionControl : new FormControl('', [Validators.required, Validators.maxLength(80)]),
      AuthorControl: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      BrandControl : new FormControl('', [Validators.required, Validators.maxLength(50)]),
      PriceControl : new FormControl('', [Validators.required]),
      LibraryIdControl : new FormControl('', [Validators.required])
    };

    this.formGroup = new FormGroup({
      TitleControl : this.controls.TitleControl,
      DescriptionControl : this.controls.DescriptionControl,
      AuthorControl : this.controls.AuthorControl,
      BrandControl : this.controls.BrandControl,
      PriceControl : this.controls.PriceControl,
      LibraryIdControl : this.controls.LibraryIdControl
    });

  }


  ngOnInit(): void {
    this.subscriptions.add(this.librariesEndpoints.getLibraries().subscribe(data => {
      this.libraries = data;
    }, error =>{
      this.showError = true;
    }))
  }

  public submit (): void {
    const model : BookModel = {
      title: this.controls.TitleControl.value,
      description : this.controls.DescriptionControl.value,
      author : this.controls.AuthorControl.value,
      brand : this.controls.BrandControl.value,
      price : this.controls.PriceControl.value,
      libraryId : this.controls.LibraryIdControl.value
    };

    this.subscriptions.add(this.booksEndpoints.postBook(model).subscribe(data =>{
      this.router.navigate(['books']);
    }, error => {
      this.showError = true;
    }));
  }


  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
