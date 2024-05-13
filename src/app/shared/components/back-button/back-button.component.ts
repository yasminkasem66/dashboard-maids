import { Component, Input, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'dash-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  private _location = inject(Location);

  @Input() buttonClasses!: string;
  @Input() buttonTitle!: string;

  back() {
    this._location.back();
  }
}
