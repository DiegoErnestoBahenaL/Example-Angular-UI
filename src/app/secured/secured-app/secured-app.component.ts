import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserViewModel } from 'src/core/models/user-viewmodel';
import { SessionService } from 'src/core/services/session.service';

@Component({
  selector: 'app-secured-app',
  templateUrl: './secured-app.component.html',
  styleUrls: ['./secured-app.component.css']
})
export class SecuredAppComponent implements OnInit {

  public userLoggedIn : UserViewModel | null = null;

  constructor(private session: SessionService, private router: Router){
  }  


  public ngOnInit(): void {
    if (!this.session.isLoggedIn()){
      this.router.navigate(['/'])
    }

    this.userLoggedIn = this.session.getUser();



  }

  public adminRights () : boolean {
    return this.session.isAdmin();
  }

  public logout(){
    this.session.logout();
    this.router.navigate(['/'])
  }
}
