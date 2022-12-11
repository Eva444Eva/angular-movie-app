import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'movie-app';
  public status = 'not reachable';

  constructor(
    private usersSvc: UsersService
  ) {}

  public ngOnInit() {
    this.usersSvc.hello().subscribe(apiStatus => {
      this.status = apiStatus;
    });
  }
}
