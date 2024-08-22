import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LibraryModel } from 'src/core/models/library-model';
import { LibrariesEndpointsService } from 'src/core/services/libraries-endpoints.service';


interface LibraryNewControls{
  NameControl : FormControl,
  TelephoneNumberControl : FormControl,
  CityControl : FormControl,
  ZipCodeControl : FormControl,
  AddressControl : FormControl
}

@Component({
  selector: 'app-new-library',
  templateUrl: './new-library.component.html',
  styleUrls: ['./new-library.component.css']
})
export class NewLibraryComponent implements OnDestroy {

  public controls : LibraryNewControls;
  public formGroup : FormGroup;

  public subscriptions : Subscription = new Subscription();

  public showError: boolean = false;


  constructor(private librariesEndpoints : LibrariesEndpointsService, private router: Router){

    this.controls = {
      NameControl : new FormControl('', [Validators.required, Validators.maxLength(80)]),
      TelephoneNumberControl : new FormControl('', [Validators.required, Validators.maxLength(10)]),
      CityControl: new FormControl('', [Validators.required]),
      ZipCodeControl : new FormControl('', [Validators.required, Validators.maxLength(5)]),
      AddressControl : new FormControl('', [Validators.required, Validators.maxLength(100)])
    };

    this.formGroup = new FormGroup({
      NameControl : this.controls.NameControl,
      TelephoneNumberControl : this.controls.TelephoneNumberControl,
      CityControl : this.controls.CityControl,
      ZipCodeControl : this.controls.ZipCodeControl,
      AddressControl : this.controls.AddressControl
    });


  }


  public submit (): void{
    const model : LibraryModel = {
      name: this.controls.NameControl.value,
      telephoneNumber : this.controls.TelephoneNumberControl.value,
      city : this.controls.CityControl.value,
      zipCode : this.controls.ZipCodeControl.value,
      address : this.controls.AddressControl.value
    };

    this.subscriptions.add(this.librariesEndpoints.postLibrary(model).subscribe(data =>{
      this.router.navigate(['libraries']);
    }, error =>{
      this.showError = true;
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
