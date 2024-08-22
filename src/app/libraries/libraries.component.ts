import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LibraryViewModel } from 'src/core/models/library-viewmodel';
import { LibrariesEndpointsService } from 'src/core/services/libraries-endpoints.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css']
})
export class LibrariesComponent implements OnInit, OnDestroy {
  
  public subscriptions : Subscription = new Subscription();

  public libraries: LibraryViewModel[] = [];
  

  constructor(private librariesEndpoints : LibrariesEndpointsService, private router: Router){}
  
  ngOnInit(): void {
    
    this.subscriptions.add(this.librariesEndpoints.getLibraries().subscribe(data => {

      this.libraries = data;

    }));

  }

  public delete(id:number){
    this.subscriptions.add(this.librariesEndpoints.deleteLibrary(id).subscribe(data =>{
      this.subscriptions.add(this.librariesEndpoints.getLibraries().subscribe(data =>{
        this.libraries = data;
      }))
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
