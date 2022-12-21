import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsersService } from '../../services/users.service';
import { UserRegistration } from '../../types/user-registration.type';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html'
})
export class UserRegistrationComponent {
  public userData: UserRegistration = {
    name: '',
    email: '',
    password: '',
    birthday: undefined
  };

  public constructor(
    private dialogRef: MatDialogRef<UserRegistrationComponent>,
    private snack: MatSnackBar,
    private userSvc: UsersService,
  ) {}

  public register() {
    this.userSvc.register(this.userData).subscribe({
      next: (user: User) => {
        this.dialogRef.close();
        this.snack.open(
          `User ${user.name} was successfully registered!`,
          'OK',
          { duration: 2000 }
        );
      },
      error: (err: Error) => {
        this.snack.open(
          `Registration unsuccessful: ${err.message}`,
          'OK',
          { duration: 5000 }
        );
      }
    });
  }
}
