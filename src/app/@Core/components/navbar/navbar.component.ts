import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'dash-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private router = inject(Router);
  userName: string = 'USER';
  localStorage!: any;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
    this.userName = this.localStorage.getItem('userInitials')!;
  }

  userDetails() {
    this.router.navigate(['user']);
  }
}
