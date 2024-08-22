import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LibraryViewModel } from 'src/core/models/library-viewmodel';
import { LibrariesEndpointsService } from 'src/core/services/libraries-endpoints.service';

@Component({
  selector: 'app-search-library',
  templateUrl: './search-library.component.html',
  styleUrls: ['./search-library.component.css']
})
export class SearchLibraryComponent implements OnDestroy {

  public subscription = new Subscription();

  public library : LibraryViewModel|null = null;

  public notFound : boolean = false;

  public searchControl = new FormControl();

  constructor(private librariesEndpoints: LibrariesEndpointsService){}





  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public search(): void{
    const name : string = this.searchControl.value;

    this.librariesEndpoints.getLibraryByName(name).subscribe(data => {
      this.library = data;
      this.notFound = false;
    }, error => {
      this.library = null;
      this.notFound = true;
    });
  }

}
