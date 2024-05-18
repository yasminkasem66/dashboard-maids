import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'dash-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private route = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  signupForm!: FormGroup;

  localStorage!: any;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['pistol', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignupFormSubmit(): void {
    if (this.signupForm.invalid) return;
    const formValue = this.signupForm.value;
    this.authService.signup(formValue).subscribe({
      next: () => {
        localStorage.setItem('token', this.signupForm.value);
        this.getNameInitials(this.signupForm.value.email);
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
    if (this.signupForm.get(formControlName)?.invalid && this.signupForm.get(formControlName)?.dirty) return true;
    return false;
  }
}
