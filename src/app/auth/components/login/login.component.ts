import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { ILoginResponse } from '../../models/ilogin-response';

@Component({
  selector: 'dash-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private route = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm!: FormGroup;
  localStorage!: any;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required]],
    });
  }

  onLoginFormSubmit(): void {
    if (this.loginForm.invalid) return;
    const formValue = this.loginForm.value;
    this.authService.login(formValue).subscribe({
      next: (user: ILoginResponse) => {
        this.localStorage.setItem('token', user.token);
        this.getNameInitials(this.loginForm.value.email);
        this.route.navigate(['/users']);
      },
    });
  }

  getNameInitials(user: string) {
    const userName = user?.toUpperCase().trim();
    if (!userName) return 'EX';
    if (userName.indexOf('.') > 0 && userName.charAt(userName.indexOf('.') + 1)) {
      const userInitials = userName.charAt(0) + userName.split('.')[1].charAt(0);
      localStorage.setItem('userInitials', userInitials);
      return userInitials;
    }
    return userName.charAt(0);
  }

  isInputInvalid(formControlName: string): boolean {
    if (this.loginForm.get(formControlName)?.invalid && this.loginForm.get(formControlName)?.dirty) return true;
    return false;
  }
}
