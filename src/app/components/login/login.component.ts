import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public loginForm: FormGroup;

  public constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private userSvc: UsersService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', {
        validators: [
          Validators.required,
          Validators.email
        ],
        updateOn: 'blur'
      }],
      password: ['',
        [Validators.required]
      ]
    });
  }

  public login() {
    this.userSvc.login(
      this.loginForm.value['email'],
      this.loginForm.value['password']
    ).subscribe({
      next: _ => {
        this.dialogRef.close();
        this.snack.open(
          `Login successful`,
          'OK',
          { duration: 2000 }
        );
      },
      error: (err: Error) => {
        this.snack.open(
          `Login unsuccessful: ${err.message}`,
          'OK',
          { duration: 5000 }
        );
      }
    });
  }
}
