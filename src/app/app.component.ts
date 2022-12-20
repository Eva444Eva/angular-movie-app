import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsersService } from './services/users.service';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { LoginComponent } from './components/login/login.component';

const DEV = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Movie App';

  constructor(
    private dialog: MatDialog,
    private usersSvc: UsersService,
  ) {
    DEV && console.log(`API status: not reachable`);
  }

  public ngOnInit() {
    this.usersSvc.hello().subscribe(apiStatus => {
      DEV && console.log(`API status: ${apiStatus}`);
    });
  }

  public openUserRegistrationDialog() {
    this.dialog.open(UserRegistrationComponent, { width: '300px' });
  }

  public openLoginDialog() {
    this.dialog.open(LoginComponent, { width: '300px' });
  }
}
