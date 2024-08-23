import { Component, OnDestroy, OnInit, Renderer2, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { LoginEndpointsService } from 'src/core/services/login-endpoints.service';
import { UnauthorizedError } from 'src/core/services/errors/UnauthorizedError';
import { SessionService } from 'src/core/services/session.service';
import { Core } from 'src/core/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public readonly USERNAME_CONTROL = 'usernameControl';
  public readonly PASSWORD_CONTROL = 'passwordControl';


  subscriptions = new Subscription();

  public loginForm:FormGroup;
  public usernameControl:FormControl;
  public passwordControl:FormControl;


  get showUsernameControlErrors() : boolean { return this.usernameControl.invalid && (this.usernameControl.dirty || this.usernameControl.touched); };
  get showPasswordControlErrors() : boolean { return this.passwordControl.invalid && (this.passwordControl.dirty || this.passwordControl.touched); };
  
  // to enable/disable when clicking logging
  enableLoginButton:boolean = true;
  get isLoginButtonEnabled(): boolean {
    if(this.enableLoginButton)
      return true;
    return false;
  };
  public disableLoginForm:boolean = false;
  public showUnknownError:boolean = false;
  public showBadLogin:boolean = false;

  constructor (
    private renderer: Renderer2, 
    private router:Router,
    private sessionService: SessionService,
    private loginEndpoints : LoginEndpointsService,
    @Inject(DOCUMENT) private document: Document
    
    ) {

    this.loginForm = new FormGroup({
      usernameControl: new FormControl('', [
        Validators.required, Validators.email
      ]),
      passwordControl: new FormControl('', [
        Validators.required, Validators.minLength(1)
      ]),
      rememberMeControl: new FormControl()
    });



    this.usernameControl = this.loginForm.get(this.USERNAME_CONTROL) as FormControl;
    this.passwordControl = this.loginForm.get(this.PASSWORD_CONTROL) as FormControl;
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'login-page');
    
    if (this.sessionService.isLoggedIn()){
      this.router.navigate(Core.securedHomePath);

    }

  }

  loginButtonClick(): void {
    if(!this.loginForm.valid){
      this.loginForm.markAllAsTouched();
      return;
    }
    if(this.disableLoginForm)
      return;

    this.showUnknownError = false;
    this.showBadLogin = false;
    this.enableLoginButton = false;
    this.disableLoginForm = true;


    this.subscriptions.add(this.loginEndpoints.login({
      email: this.usernameControl.value,
      password: this.passwordControl.value
    }).subscribe(data => {

      this.sessionService.login(data);

      console.log(data)
      this.router.navigate(Core.securedHomePath)
      
    }, error => {
      this.disableLoginForm = false;
      this.enableLoginButton = true;

   
        this.showBadLogin = true;
 
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.renderer.removeClass(this.document.body, 'login-page');
  }
}
