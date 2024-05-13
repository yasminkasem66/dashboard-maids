import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';

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
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['test', [Validators.required]],
    });
  }

  onLoginFormSubmit(): void {
    if (this.loginForm.invalid) return;
    const formValue = this.loginForm.value;
    const exists = this.authService.getUsers.some(
      (item) => item.email === formValue.email && item.password == formValue.password,
    );
    if (!exists) return;
    this.localStorage.setItem('user', this.loginForm.value);
    this.getNameInitials(this.loginForm.value.email);
    this.route.navigate(['']);
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
