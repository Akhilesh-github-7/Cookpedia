import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const username = this.registerForm.value.username;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      
      this.api.registerAPI({ username, email, password }).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.snackBar.open(`Welcome ${res.username}, please Login To Explore!!`, 'Login', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          }).onAction().subscribe(() => {
            this.router.navigateByUrl('/login');
          });
          
          this.router.navigateByUrl('/login');
          this.registerForm.reset();
        },
        error: (reason: any) => {
          this.isLoading = false;
          this.snackBar.open(reason.error || 'Registration Failed', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
          this.registerForm.reset();
        }
      });
      
    } else {
      this.snackBar.open('Please fill the form correctly', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}
